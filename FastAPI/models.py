from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Float
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String(25))
    lastName = Column(String(25))
    email = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(70))
class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(75))
    author = Column(String(50))
    description = Column(Text(2000))
    genres = Column(Text(200))
    characters = Column(Text(300))
    coverImg = Column(String(100))
    stok = Column(Integer)
    price = Column(Float)



