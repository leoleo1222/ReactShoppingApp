## Installation

To get started, first ensure that you have Python installed on your system. You can download the latest version of Python from the official Python website: https://www.python.org/downloads/

Once you have Python installed, open a terminal or command prompt and run the following command to install `pipenv`:

```shell
python -m pip install pipenv
```

## Setting up the Environment

To set up the Python environment and install the required packages, follow these steps:

1. Navigate to the project directory in your terminal or command prompt.
2. Run the following command to create a new virtual environment and install the required packages:

```shell
python -m pipenv install django djangorestframework paypalrestsdk pillow
```

This will create a new virtual environment and install Django, Django REST framework, PayPal REST SDK, and Pillow.

3. Activate the virtual environment by running the following command:

```shell
python -m pipenv shell
```

You should now see your terminal prompt change, indicating that you are inside the virtual environment.

## Checking Installed Packages

To check the installed packages and their versions, run the following command:

```shell
pip freeze
```

This will display a list of installed packages along with their versions.

## Creating Django Projects and Apps

To create a new Django project and apps, use the following commands:

- To create a new Django project:

```shell
django-admin startproject project_name
```

Replace `project_name` with the desired name for your project.

- To create a new Django app:

```shell
django-admin startapp app_name
```

### Setting up CA File

1. Open the command prompt or terminal.

2. Run the following command to set the CA file path:
   ```
   npm config set cafile "C:\Program Files\nodejs\certs\ca.pem"
   ```

### Disabling Strict SSL

1. Open the command prompt or terminal.

2. Run the following command to disable strict SSL:
   ```
   npm config set strict-ssl false
   ```

### Installing Expo CLI Globally

1. Open the command prompt or terminal.

2. Run the following command to install Expo CLI globally:
   ```
   npm install --global expo-cli
   ```
   
## Alternative Approach to Disable Certificate Verification

If you are experiencing issues with the `copy nul` command, you can follow these steps to disable certificate verification in Node.js:

1. Open the command prompt.

2. Create an empty text file named `ca.crt` using the `echo` command with an empty string. Enter the following command:
   ```
   echo. > ca.crt
   ```

3. Set the `NODE_EXTRA_CA_CERTS` environment variable to the empty file path using the following command:
   ```
   set NODE_EXTRA_CA_CERTS=ca.crt
   ```

4. Finally, run the `npx expo start` command again:
   ```
   npx expo start
   ```
