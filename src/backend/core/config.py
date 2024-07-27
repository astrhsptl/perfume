from datetime import timedelta
from os import getenv as env

from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = env("DB_LINK")

SECRET_KEY = env("SECRET_KEY")

ALGORITHM = env("ALGORITHM")

ACCESS_EXPIRES_TIME = timedelta(minutes=60)
REFRESH_EXPIRES_TIME = timedelta(hours=12)

MINIO_ACCESS_KEY = env("MINIO_ACCESS_KEY")
MINIO_SECRET_KEY = env("MINIO_SECRET_KEY")
S3_URL = env("S3_URL")
S3_BUCKET_NAME = env("S3_BUCKET_NAME")
