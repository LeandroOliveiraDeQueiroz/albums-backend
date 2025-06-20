# albums-backend
BFF that uses https://jsonplaceholder.typicode.com/ as a Backend for technical assessment

**Obs.: All development was made using Node v20.9.0**

**Easter Egg:** I found a bug on **jsonplaceholder**. I will add to the end of the readme 

## Run <a name="run"></a>

**Requirements:**

- npm,

**Install:**

1.  Clone the repository:
   
```bash
git clone https://github.com/LeandroOliveiraDeQueiroz/albums-backend.git
cd albums-backend
```
2.  Install node modules:

```
npm install
```
**Exec.:**

1. To run the project in development:

```bash
npm run dev
```

## jsonplaceholder bug
- Every create an Album request, "generates" the id 101 - can cause problems at React keys
  
  ![image](https://github.com/user-attachments/assets/de62e8c6-c4cb-4ea7-a338-c74e6d1e614d)

- Updates of Albums with ID higher than 100 cause error 500 - it is not possible to "update" a created Album
- - ID: 100
    
![image](https://github.com/user-attachments/assets/22006aaa-95e6-4e10-bf3b-e69e37ac877c)

- - ID: 101
    
![image](https://github.com/user-attachments/assets/1498a714-14f5-49b9-b7bf-ca66b5b33b0a)


