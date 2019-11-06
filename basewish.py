#!/usr/bin/python3
"""
Contains Wish class
"""

from datetime import datetime
import uuid
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from storage import storage_instance

time = "%Y-%m-%d|%H:%M:%S"
Base = declarative_base()


class Wish(Base):
    """
    The Wish class which provides the skeleton of a wish
    """

    """
    sqlalchemy variable mappings
    """
    __tablename__ = 'allwishes_test'
    wish_id = Column(String(128), nullable=False, primary_key=True)
    name = Column(String(128), nullable=False)
    state = Column(String(128), nullable=False)
    country = Column(String(128), nullable=False)
    star_name = Column(String(128), nullable=False)
    wish = Column(String(128), nullable=False)
    creation_time = Column(String(128), nullable=False)

    def __init__(self, name, state, country, star_name, wish):
        """
        Class constructor
        """
        self.wish_id = str(uuid.uuid4())
        self.name = name
        self.state = state
        self.country = country
        self.star_name = star_name
        self.wish = wish
        self.creation_time = datetime.strftime(datetime.utcnow(), time)

    def save(self):
        """
        Saves Wish object to database using Storage class
        """
        storage_instance.new(self)
        storage_instance.save()

    def to_dict(self):
        """
        Return dictionary representation of Wish object
        """
        dict_copy = self.__dict__.copy()
        if '_sa_instance_state' in dict_copy:
            del dict_copy['_sa_instance_state']
        return dict_copy
