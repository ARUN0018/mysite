import matplotlib.pyplot as plt
import numpy as np

y=np.array([35,25,20,10]) 
datas=["Mobile","Phone","TV","Dress"]
mexplode=[0.2,0,0,0.6]

plt.pie(y,labels=datas,explode=mexplode,shadow=True)
plt.show()
