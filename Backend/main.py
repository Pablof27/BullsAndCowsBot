from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from logic import NumberGuesser

class GuessRequest(BaseModel):
    guess: int
    secret_number: int

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Backend App!"}

@app.get("/status")
def read_status():
    return JSONResponse(content={"status": "OK"})

@app.post("/api/guess")
def make_guess(guess_request: GuessRequest):
    guess = guess_request.guess
    secret_number = guess_request.secret_number
    
    pattern = NumberGuesser.get_pattern(str(guess), str(secret_number))
    return JSONResponse(content={"result": pattern})

@app.post("/api/new_game")
def new_game(size: int = 4):
    ng = NumberGuesser(n=size)
    return JSONResponse(content={"secret_number": ng.make_choice(n=size)})