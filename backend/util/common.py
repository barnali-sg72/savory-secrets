import bcrypt
from server.models.user import User


def hashPassword(user: User):
    passwd = user["password"]
    #print(passwd)

    bytes = passwd.encode('utf-8') 
  
    # generating the salt 
    salt = bcrypt.gensalt() 
    
    # Hashing the password 
    hash = bcrypt.hashpw(bytes, salt) 
    user["password"] = hash.decode('utf-8')
    return user