print("Welcome to my computer Quiz!")

playing = input("Do you want play yes/no ?")

if playing.lower() !="yes": 
    quit()

print("Ok! Let's play:)")
score=0

answer=input("what does CPU stand for?")
if answer=="central processing unit":
    print('Correct')
    score += 1
else:
    print('Incorrect') 

answer=input("what does GPU stand for?")
if answer.lower()=="Graphical processing unit ":
    print('Correct')
    score += 1
else:
    print('Incorrect') 

answer=input("what does PSU stand for?")
if answer.lower()=="power supply":
    print('Correct')
    score += 1
else:
    print('Incorrect') 

answer=input("what does RAM stand for?")
if answer.lower()=="random access memory":
    print('Correct')
    score += 1
else:
    print('Incorrect') 

answer=input("what does ROM stand for?")
if answer.lower()=="read only memory":
    print('Correct')
    score += 1
else:
    print('Incorrect')    

print("you got "+str(score)+" Questions correct")
print("you got "+str((score/5)*100)+" %.")

if():
    score >= 3
    print("Congratulation !! You are 'PASS' ")
else:
    print("Sorry you are 'FAIL' better luck next time!!" )