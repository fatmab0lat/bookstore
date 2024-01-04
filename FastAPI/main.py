import fastapi
from fastapi import HTTPException
import pydantic
from typing import Annotated, List, Union
import models
import database
import sqlalchemy.orm
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import bcrypt
from passlib.context import CryptContext
from database import SessionLocal
from models import User
#yeni basladigim filter kismi

app = fastapi.FastAPI()
# app.include_router(auth.router)


origins = [
  "http://localhost",
  "http://localhost:5173",
  "http://localhost:5173/signUp/",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins = origins,
  allow_credentials = True,
  allow_methods = ['*'],
  allow_headers = ['*'],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str):
    return pwd_context.hash(password)

class UserBase(pydantic.BaseModel):
  firstName: str
  lastName: str
  email: str
  hashed_password: str

class UserModel(UserBase):
  id:int

  class Config:
    orm_mode = True
class BookBase(pydantic.BaseModel):
  title: str
  author: str
  description: str
  genres : str
  page : int
  coverImg : str
  stok : int
  price : float

class BookModel(BookBase):
  id:int

  class Config:
    orm_mode = True


def get_db():
  db = database.SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[sqlalchemy.orm.Session, fastapi.Depends(get_db)]
models.Base.metadata.create_all(bind=database.engine)

# @app.post("/hash-password/")
def hash_password(password: str):
  hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
  return hashed_password.decode('utf-8')

@app.post("/users/",status_code=fastapi.status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: db_dependency):
  user.hashed_password = hash_password(user.hashed_password)
  db_user = models.User(**user.dict())
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user

@app.get("/users/", response_model= List[UserModel])
async def read_users(db: db_dependency, skip: int = 0, limit: int = 100):
  users = db.query(models.User).offset(skip).limit(limit).all()
  return users

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    db.close()
    return {"message": "User deleted successfully"}


@app.post("/books/",status_code=fastapi.status.HTTP_201_CREATED)
async def create_book(book: BookBase, db: db_dependency):
  db_book = models.Book(**book.dict())
  #user.hashed_password = get_password_hash(user.password)
  db.add(db_book)
  # db.commit()
  # db.refresh(db_user)
  # return db_user

@app.get("/books/", response_model= List[BookModel])
async def read_books(db: db_dependency, skip: int = 0, limit: int = 100):
  books = db.query(models.Book).offset(skip).limit(limit).all()
  return books
  
#deneme
@app.get("/books/{genre}", response_model= List[BookModel])
async def get_books_by_genre(genre: str, db: db_dependency):
    if genre is None:
        raise HTTPException(status_code=400, detail="Genre not provided")
    books = db.query(models.Book).filter(models.Book.genres == genre).all()
    if not books:
        raise HTTPException(status_code=404, detail="No books found for this category")
    return books

