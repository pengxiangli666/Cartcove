# TheOverlords
CartCove is a shopping website dedicated towards offering an easy shopping experience for our customers.

This webapp is being developed using Django and React, with the Django REST api being used as well. We're also utilizing Babel, Webpack, and Bootstrap.

For React, we're using TypeScript.
For Django, we're using Python.

## External Requirements

In order to build this project you first have to install:

* [Python](https://https://www.python.org/downloads/)
* [Node.js](https://nodejs.org/en/)

For installing Django and the REST framework, run the following commands.
```
pip install Django==4.2.6
pip install djangorestframework
```

To install React and the other related libraries, run the following command.
```
npm i react react-dom react-router-dom
```

Once that is done, clone the repository with the following command.
```
git clone https://github.com/SCCapstone/TheOverlords
```

## Setup

Once the repo is done downloading, navigate to ~/TheOverlords/CartCove/frontend/ and run this command.
```
npm install
```

## Running

To run this site, first open up two terminals. In the first one, navigate to ~/CartCove and run the following command.
```
python .\manage.py runserver
```
Then, use the other terminal and navigate to ~/CartCove/frontend/ and run the following command.
```
npm run dev
```
After that, open up a browser and visit http://127.0.0.1:8000/

## Coding Style

Frontend:
* [Prettier](https://prettier.io/)

Backend:
* [Black](https://black.readthedocs.io/en/stable/)

## Testing Part
Unit Test:
* First enter the virtual environment.
```
cd TheOverlords
source venv/bin/activate
```
* Go to Cartcove 
```
cd CartCove
```
* Download requirements app
```
pip install -r requirements.txt
```
* Run the test
```
python3 manage.py test cart
```
* 
   This test includes whether a user can be successfully created and the correct token is returned. Whether items can be added to the shopping cart and then removed. Whether new items can be created and deleted.

Behavorial Test:
* Navigate to ~/CartCove/frontend and run the following commands if this is the first time testing
```
npm install -g selenium-side-runner
npm install -g chromedriver
```
* To run the test, use the following command
```
selenium-side-runner tests/CartCove.side
```
# Authors

* Pengxiang Li pl7@email.sc.edu
* Jamel chouarfj@email.sc.edu
* Yixuan Liu yixuanl@email.sc.edu
* Zhongsheng Li	zl11@email.sc.edu

1
