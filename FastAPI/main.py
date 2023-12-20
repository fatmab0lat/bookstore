import fastapi
import pydantic
from typing import Annotated, List
import models
import database
import sqlalchemy.orm
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = fastapi.FastAPI()

origins = [
  "http://localhost:5173/signUp/",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins = ["*"],
  allow_credentials = True,
  allow_methods = ['*'],
  allow_headers = ['*'],
)

class UserBase(pydantic.BaseModel):
  firstName: str
  lastName: str
  email: str
  hashed_password: str

class UserModel(UserBase):
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

@app.post("/users/",status_code=fastapi.status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: db_dependency):
  db_user = models.User(**user.dict())
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user

@app.get("/users/", response_model= List[UserModel])
async def read_users(db: db_dependency, skip: int = 0, limit: int = 100):
  users = db.query(models.User).offset(skip).limit(limit).all()
  return users