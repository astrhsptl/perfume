from minio import Minio
from minio.error import S3Error

bucket_name = "test-bucket"
minio_host = "s3.labofdev.ru"

# Initialize MinIO client
minio_client = Minio(
    minio_host,  # replace with your MinIO server address
    access_key="NCitCJJY49q8ZY4YiLP4",
    secret_key="GdUd3KB6KJOEAP7YStpJmAO9QFX9C25EId2XXn5C",
    secure=True,  # set to False if using HTTP
)

if not minio_client.bucket_exists(bucket_name):
    minio_client.make_bucket(bucket_name)
