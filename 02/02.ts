import fs from 'fs';

enum OpponentPlay {
    Rock = 'A',
    Paper = 'B',
    Scissors = 'C'
}

enum MyPlay {
    Rock = 'X',
    Paper = 'Y',
    Scissors = 'Z'
}

const rounds = fs.readFileSync('02/input.txt', 'utf8').split('\n').slice(0, -1);

const getOutcomeScore = (myPlay: MyPlay, opponentPlay: OpponentPlay) => {
    if (
        (myPlay === MyPlay.Rock && opponentPlay === OpponentPlay.Rock) ||
        (myPlay === MyPlay.Paper && opponentPlay === OpponentPlay.Paper) ||
        (myPlay === MyPlay.Scissors && opponentPlay === OpponentPlay.Scissors)
    ) {
        return 3;
    }

    if (
        (myPlay === MyPlay.Rock && opponentPlay === OpponentPlay.Scissors) ||
        (myPlay === MyPlay.Paper && opponentPlay === OpponentPlay.Rock) ||
        (myPlay === MyPlay.Scissors && opponentPlay === OpponentPlay.Paper)
    ) {
        return 6;
    }

    return 0;
};

const getPlayScore = (play: MyPlay) => {
    switch (play) {
        case MyPlay.Rock:
            return 1;
        case MyPlay.Paper:
            return 2;
        case MyPlay.Scissors:
            return 3;
    }
};

const part1 = (() =>
    rounds.reduce((totalScore, round) => {
        const [opponentPlay, myPlay] = round.split(' ') as [OpponentPlay, MyPlay];

        return totalScore + getOutcomeScore(myPlay, opponentPlay) + getPlayScore(myPlay);
    }, 0))();

const part2 = (() => {
    enum NecessaryOutcome {
        Loss = 'X',
        Draw = 'Y',
        Win = 'Z'
    }

    return rounds.reduce((totalScore, round) => {
        const [opponentPlay, necessaryOutcome] = round.split(' ') as [OpponentPlay, NecessaryOutcome];

        const myPlay = (() => {
            switch (necessaryOutcome) {
                case NecessaryOutcome.Loss:
                    switch (opponentPlay) {
                        case OpponentPlay.Rock:
                            return MyPlay.Scissors;
                        case OpponentPlay.Paper:
                            return MyPlay.Rock;
                        case OpponentPlay.Scissors:
                            return MyPlay.Paper;
                    }
                case NecessaryOutcome.Draw:
                    switch (opponentPlay) {
                        case OpponentPlay.Rock:
                            return MyPlay.Rock;
                        case OpponentPlay.Paper:
                            return MyPlay.Paper;
                        case OpponentPlay.Scissors:
                            return MyPlay.Scissors;
                    }
                case NecessaryOutcome.Win:
                    switch (opponentPlay) {
                        case OpponentPlay.Rock:
                            return MyPlay.Paper;
                        case OpponentPlay.Paper:
                            return MyPlay.Scissors;
                        case OpponentPlay.Scissors:
                            return MyPlay.Rock;
                    }
            }
        })();

        return totalScore + getOutcomeScore(myPlay, opponentPlay) + getPlayScore(myPlay);
    }, 0);
})();
