import fastapi
from fastapi import Depends, HTTPException, status
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
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import datetime,timedelta
from jose import jwt, JWTError


app = fastapi.FastAPI()

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

origins = [
  "http://localhost",
  "http://localhost:5173",
  "http://localhost",
  "http://localhost:5173",
  "http://localhost:5173/signUp/",
  "http://localhost:5174"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins = origins,
  allow_credentials = True,
  allow_methods = ['*'],
  allow_headers = ['*'],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="token")
  
def verify_password(plain_password, hashed_password):
  return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(user_email: str, password: str, db):
  user = db.query(User)\
        .filter(User.email == user_email)\
        .first()
        
  if not user:
          return False
  if not verify_password(password,user.hashed_password):
    return False
  return user


def create_access_token(email: str, user_id: int,
                        expires_delta:timedelta):
    encode = {'sub':email,'id':user_id}
    if expires_delta:
      expire = datetime.utcnow() + expires_delta
    else:
      expire = datetime.utcnow() + timedelta(minutes = 15)
    encode.update({'exp': expire})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
  
async def get_current_user(token: str = Depends(oauth2_bearer)):
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms= [ALGORITHM])
    email: str = payload.get("sub")
    user_id: int = payload.get("id")
    
    if email is None or user_id is None:
      #raise HTTPException(status_code=404, detail="User not Found")
      raise get_user_exception()
    return {"email": email, "id": user_id}
  except JWTError:
    #raise HTTPException(status_code=404, detail="User not Found")
    get_user_exception()
  


oauth2_bearer = OAuth2PasswordBearer(tokenUrl="token")
  
def verify_password(plain_password, hashed_password):
  return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(user_email: str, password: str, db):
  user = db.query(User)\
        .filter(User.email == user_email)\
        .first()
        
  if not user:
          return False
  if not verify_password(password,user.hashed_password):
    return False
  return user




def create_access_token(email: str, user_id: int,
                        expires_delta:timedelta):
    encode = {'sub':email,'id':user_id}
    if expires_delta:
      expire = datetime.utcnow() + expires_delta
    else:
      expire = datetime.utcnow() + timedelta(minutes = 15)
    encode.update({'exp': expire})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
  
async def get_current_user(token: str = Depends(oauth2_bearer)):
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms= [ALGORITHM])
    email: str = payload.get("sub")
    user_id: int = payload.get("id")
    
    if email is None or user_id is None:
      #raise HTTPException(status_code=404, detail="User not Found")
      raise get_user_exception()
    return {"email": email, "id": user_id}
  except JWTError:
    #raise HTTPException(status_code=404, detail="User not Found")
    get_user_exception()
  


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

class SoldBookBase(pydantic.BaseModel):
  bookid: int
  userid: int
  book_title: str
  price: float
  
class SoldBookModel(SoldBookBase):
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
  user.hashed_password = hash_password(user.hashed_password)
  db_user = models.User(**user.dict())
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user

@app.post("/token/")
async def login_for_access_token(form_data : OAuth2PasswordRequestForm = Depends(),
                                 db: sqlalchemy.orm.Session = Depends(get_db)):
  user = authenticate_user(form_data.username,form_data.password, db)
  if not user:
    #raise HTTPException(status_code=404, detail="User not found")
    raise token_exceptions()
  token_expires = timedelta(minutes = 20)
  token = create_access_token(user.email,
                              user.id,
                              expires_delta= token_expires)
  return {"token" : token}

#Exceptions
def get_user_exception():
  credentials_exceptions= HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail= "Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"}
  )
  return credentials_exceptions

def token_exceptions():
  token_exception_response = HTTPException(
    status_code = status.HTTP_401_UNAUTHORIZED,
    detail= "Incorrect e-mail or password",
    headers={"WWW-Authenticate": "Bearer"}
  )
  return token_exception_response

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

# get book by id for detail page
@app.get("/books/by-id/{book_id}", response_model=BookModel)
async def read_book_by_id(book_id: int , db: db_dependency):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not book:
      raise HTTPException(status_code=404, detail="Book not found")
    return book



class PurchaseModel(pydantic.BaseModel):
    user_id: int
    items: List[SoldBookBase]

@app.post("/confirm-basket/", status_code=fastapi.status.HTTP_201_CREATED)
async def confirm_basket(purchase: PurchaseModel, db: db_dependency, current_user: dict = Depends(get_current_user)):
    for item in purchase.items:
        db_sold_book = models.SoldBook(
            user_id=current_user["id"],
            book_id=item.bookid,
            book_title=item.book_title,
            price=item.price,
        )
        db.add(db_sold_book)

    db.commit()

    return {"message": "Basket confirmed successfully"}
