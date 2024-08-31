from datetime import timedelta
from os import getenv as env

from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = env("DB_LINK")

SECRET_KEY = env("SECRET_KEY")

ALGORITHM = env("ALGORITHM")

ACCESS_EXPIRES_TIME = timedelta(hours=8)
REFRESH_EXPIRES_TIME = timedelta(days=7)

MINIO_ACCESS_KEY = env("MINIO_ACCESS_KEY")
MINIO_SECRET_KEY = env("MINIO_SECRET_KEY")
S3_URL = env("S3_URL")
S3_BUCKET_NAME = env("S3_BUCKET_NAME")

CART_STATUS_OPEN = env("CART_STATUS_OPEN")
CART_STATUS_CLOSE = env("CART_STATUS_CLOSE")
