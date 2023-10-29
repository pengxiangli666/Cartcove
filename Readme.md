# TheOverlords
Welcome to the TheOverlords, a comprehensive shopping website that allows users to freely upload and manage product listings, complete with prices, images, and contact information. Customers can browse through the site to find and learn more about the products they are interested in.

## External Requirements

To build an application with Django REST framework and React, you need to install the following software and libraries on your Windows PC.

### Required:

1. **Python**:
   - Django is written in Python, so you need to have Python installed. You can download the Windows version of Python from the [official Python website](https://www.python.org/downloads/windows/).
   - Installation command: Visit the [official Python website](https://www.python.org/downloads/windows/), download the version applicable to your system (usually the latest version), and follow the installation guide.

2. **pip**:
   - The Python package manager, usually installed with Python.

3. **Node.js and npm**:
   - Required for React. You can download them from the [official Node.js website](https://nodejs.org/en/).
   - Installation command: Visit the [official Node.js website](https://nodejs.org/en/), download the version applicable to your system, and follow the installation guide.

4. **Django and Django REST framework**:
   - You can install Django and Django REST framework using pip.
   - Installation command:
     ```powershell
     pip install django djangorestframework
     ```

### Optional:

1. **Virtual Environment**:
   - It¡¯s recommended to work within a Python virtual environment to manage project dependencies.
   - Installation command:
     ```powershell
     pip install virtualenv
     ```

2. **Database**:
   - Django uses SQLite by default, so you don¡¯t need to install another database immediately. However, if you decide to use PostgreSQL or MySQL, you need to install the respective database and Python library.
   - To install PostgreSQL and the corresponding Python library:
     ```powershell
     # Download and install PostgreSQL from: https://www.postgresql.org/download/windows/
     pip install psycopg2
     ```
   - To install MySQL and the corresponding Python library:
     ```powershell
     # Download and install MySQL from: https://dev.mysql.com/downloads/installer/
     pip install mysqlclient
     ```

### Installation Steps:

1. Install Python, pip, and Virtual Environment.
2. Create and activate a virtual environment (if you choose to use one).
3. Install Django and Django REST framework.
4. Install Node.js and npm.
5. Depending on your project requirements, choose and install a database (if you decide not to use SQLite).

After completing these steps, you should be ready to start developing your Django-React application. Remember to activate your virtual environment with the command `.\venv\Scripts\activate` (where `venv` is the name of your virtual environment) every time you start a new command prompt session to work on your project.

## Setup

Here you list all the one-time things the developer needs to do after cloning
your repo. Sometimes there is no need for this section, but some apps require
some first-time configuration from the developer, for example: setting up a
database for running your webapp locally.

## Running

Specify the commands for a developer to run the app from the cloned repo.

# Deployment

Webapps need a deployment section that explains how to get it deployed on the 
Internet. These should be detailed enough so anyone can re-deploy if needed
. Note that you **do not put passwords in git**. 

Mobile apps will also sometimes need some instructions on how to build a
"release" version, maybe how to sign it, and how to run that binary in an
emulator or in a physical phone.

# Testing

In 492 you will write automated tests. When you do you will need to add a 
section that explains how to run them.

The unit tests are in `/test/unit`.

The behavioral tests are in `/test/casper/`.

## Testing Technology

In some cases you need to install test runners, etc. Explain how.

## Running Tests

Explain how to run the automated tests.

# Authors

Your names and emails
