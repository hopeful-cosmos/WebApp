#!/usr/bin/python3
"""
Contains Storage class
"""
import sqlalchemy
import basewish


class Storage:
    """
    The Storage class that handles storing and pulling from MySQL
    """

    __engine = None
    __session = None
    __ssfactory = None

    def __init__(self):
        """
        Creates the engine and binds it to private attribute __session
        """
        self.__engine = sqlalchemy.create_engine(
            'mysql+mysqldb://{}:{}@{}/{}'.format('grandma', 'dummypassword123',
                                                 'localhost', 'wishdb'))

    def grab_all(self):
        """
        Grabs all wish objects from database
        """
        return self.__session.query(basewish.Wish).limit(50).all()

    def new(self, obj):
        """
        Add wish object to current session and stage for commit
        """
        if obj is not None:
            self.__session.add(obj)
        else:
            print('Failed to add wish object')

    def save(self):
        """
        Commit added wish objects in current session
        """
        try:
            self.__session.commit()
            return True
        except sqlalchemy.exc.IntegrityError as err:
            print('Failed to commit changes to current session. \
            For some reason, a duplicate id may have been created.')
            return False

    def close(self):
        """
        Close scoped session factory
        """
        # if self.__ssfactory is not None:
        self.__ssfactory.remove()

    def reload(self):
        """
        Reload data and create session from factory
        """
        sqlalchemy.ext.declarative.declarative_base().metadata.create_all(self.__engine)
        session_factory = sqlalchemy.orm.sessionmaker(bind=self.__engine,
                                                      expire_on_commit=False)
        self.__ssfactory = Session = sqlalchemy.orm.scoped_session(session_factory)
        self.__session = Session()

# Instance of storage class
storage_instance = Storage()
# Attempt to create session
try:
    storage_instance.reload()
except sqlalchemy.exc.OperationalError as err:
    print(err)
    print('Operational error caught. DB may not be up.')
