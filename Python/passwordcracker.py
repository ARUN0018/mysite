from random import *
import os

u_pwd = input("Enter a password: ")
pwd = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
]

pw = ""
while pw != pwd:
    pw = ""
    for letter in range(len(u_pwd)):
        guess_pwd = pwd[randint(0, 17)]
        pw = str(guess_pwd) + str(pwd)
        print(pw)
        print("Creaking password.. please wait")
        os.system("cls")

print("Your Password is: ", pw)

# LETS CRACK IT
