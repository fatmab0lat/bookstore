from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Float
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String(25))
    lastName = Column(String(25))
    email = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(70))
    
    sold_books = relationship("SoldBook", back_populates="user")

    
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
    
    sold_books = relationship("SoldBook", back_populates="book")


class SoldBook(Base):
    __tablename__ = "sold_books"

    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey('books.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    book_title = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)

    # Define relationships
    user = relationship("User", back_populates="sold_books")
    book = relationship("Book", back_populates="sold_books")


