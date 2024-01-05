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
    title = Column(String(100))
    author = Column(String(100))
    description = Column(Text(800))
    genres = Column(String(18))
    page = Column(Integer)
    coverImg = Column(String(120))
    stok = Column(Integer)
    price = Column(Float)




