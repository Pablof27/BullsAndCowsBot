import numpy as np
from itertools import combinations, permutations
from random import choice

class NumberGuesser:
    def __init__(self, n=4):
        self.n = n
        self.numbers = self.generate_numbers(n)
        self.possible_numbers = self.generate_numbers(n)

    def generate_numbers(self, n):
        digits = '123456789'

        result = []
        for digit_combo in combinations(digits, n):
            for perm in permutations(digit_combo):
                result.append(''.join(perm))

        return np.array(result)

    def make_new_guess(self):
        if len(self.possible_numbers) == 0:
            return None

        if len(self.possible_numbers) == 1:
            return self.possible_numbers[0]

        if len(self.possible_numbers) == len(self.numbers):
            return choice(list(self.numbers))

        return max(self.numbers, key=lambda guess: self.calculate_entropy(guess))

    def update_possible_numbers(self, guess, pattern):
        if len(self.possible_numbers) == 0:
            return
        
        mask = np.zeros(len(self.possible_numbers), dtype=bool)

        guess_set = set(guess)
        for i, number in enumerate(self.possible_numbers):
            correct_positions = sum(g == n for g, n in zip(guess, number))
            correct_digits = len(guess_set & set(number))
            wrong_positions = correct_digits - correct_positions
            mask[i] = (wrong_positions == pattern[0]) and (correct_positions == pattern[1])

        self.possible_numbers = self.possible_numbers[mask]
        
    def calculate_entropy(self, guess):
        if len(self.possible_numbers) == 0:
            return -1

        pattern_counts = np.zeros((self.n + 1, self.n + 1), dtype=int)
        for number in self.possible_numbers:
            i, j = self.get_pattern(guess, number)
            pattern_counts[i, j] += 1

        probabilities = pattern_counts / len(self.possible_numbers)
        entropy = np.sum(probabilities[probabilities > 0] * np.log2(probabilities[probabilities > 0]) * -1)
        
        return entropy

    def get_pattern(self, guess, number):
        correct_position = sum(g == n for g, n in zip(guess, number))
        correct_digit = sum(1 if d in number else 0 for d in guess)
        return correct_digit - correct_position, correct_position

if __name__ == "__main__":
    attempts = []
    reps = 1000
    for i in range(reps):
        ng = NumberGuesser(4)
        number = choice(list(ng.numbers))
        print(f"Number to guess (for testing): {number}")
        guess = ng.make_new_guess()
        count = 1
        while guess is not None:
            print(f"New guess: {guess}")
            # Simulate feedback
            pattern = ng.get_pattern(guess, number)
            print(f"Pattern for guess {guess} against number {number}: {pattern}")
            # input("Press Enter to continue...")
            if pattern == (0, ng.n):
                print("Guessed the number!")
                print()
                break
            ng.update_possible_numbers(guess, pattern)
            guess = ng.make_new_guess()
            count += 1
        attempts.append(count)
    print(f"Average attempts over {reps} games: {np.mean(attempts)}")