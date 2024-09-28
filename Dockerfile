 FROM python:3.12.0
 COPY C:\\Users\\Public\\React-JS\\House-Pricing\\housing\\flask_api.py
 WORKDIR /doker_folder_destiny
 RUN pip install -r requirements.txt
 EXPOSE $PORT
 CMD gunicorn --workers=4 --bind 0.0.0.0:$PORT flask_api:app


#  FROM python       # base image from dokerhub 
#  COPY C:\\Users\\Public\React-JS\House-Pricing\housing\flask_api.py    #copy from the directory where ypur file stored
#  WORKDIR /doker_folder_destiny
#  RUN pip install -r requirements.txt    # install dependency to need to proj work properly 
#  EXPOSE $PORT
#  CMD gunicorn --workers=4 --bind 0.0.0.0:$PORT app:flask_api