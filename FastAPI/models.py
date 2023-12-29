from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String(25))
    lastName = Column(String(25))
    email = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(300))



