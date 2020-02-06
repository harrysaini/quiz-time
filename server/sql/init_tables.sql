-- User
CREATE TABLE `users` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`, `username`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE
);
-- Topic
CREATE TABLE `topic` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);
-- Questions
CREATE TABLE `questions` (
  `id` varchar(255) NOT NULL,
  `topicId` varchar(255) DEFAULT NOT NULL,
  `text` varchar(255) NOT NULL,
  `images` varchar(255) DEFAULT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `topicId_idx` (`topicId`),
  CONSTRAINT `topicId` FOREIGN KEY (`topicId`) REFERENCES `topic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Answers
CREATE TABLE `answers` (
  `id` VARCHAR(255) NOT NULL,
  `questionId` VARCHAR(255) NULL,
  `text` VARCHAR(255) NOT NULL,
  `index` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `question_idx` (`questionId` ASC) VISIBLE,
  CONSTRAINT `question` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Question to correct answer mapping
CREATE TABLE `correct_answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `questionId` VARCHAR(255) NOT NULL,
  `answerId` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `question_idx` (`questionId` ASC) VISIBLE,
  INDEX `answer_idx` (`answerId` ASC) VISIBLE,
  CONSTRAINT `question_answer` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `answer_question` FOREIGN KEY (`answerId`) REFERENCES `answers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Game
CREATE TABLE `game` (
  `id` VARCHAR(255) NOT NULL,
  `player1` VARCHAR(255) NOT NULL,
  `player2` VARCHAR(255) NOT NULL,
  `topicId` VARCHAR(255) NOT NULL,
  `num_questions` INT NOT NULL,
  `player1_played` TINYINT NULL DEFAULT 0,
  `player2_played` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `playerOne_idx` (`player1` ASC) VISIBLE,
  INDEX `playerTwo_idx` (`player2` ASC) VISIBLE,
  INDEX `gameTopic_idx` (`topicId` ASC) VISIBLE,
  CONSTRAINT `playerOne` FOREIGN KEY (`player1`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `playerTwo` FOREIGN KEY (`player2`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gameTopic` FOREIGN KEY (`topicId`) REFERENCES `topic` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
-- Game_questions
CREATE TABLE `game_questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gameId` VARCHAR(255) NOT NULL,
  `questionId` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `game_idx` (`gameId` ASC) VISIBLE,
  INDEX `questions_in_game_idx` (`questionId` ASC) VISIBLE,
  CONSTRAINT `game` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `questions_in_game` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- User Answers
CREATE TABLE `user_answers` (
  `id` INT NOT NULL,
  `userId` VARCHAR(45) NOT NULL,
  `game_question_id` VARCHAR(45) NOT NULL,
  `answerId` VARCHAR(45) NOT NULL,
  `isCorrect` TINYINT NULL DEFAULT 0,
  `points` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `game_questions_idx` (`game_question_id` ASC) VISIBLE,
  INDEX `user_playing_idx` (`userId` ASC) VISIBLE,
  INDEX `answerId_idx` (`answerId` ASC) VISIBLE,
  CONSTRAINT `game_questions` FOREIGN KEY (`game_question_id`) REFERENCES `game_questions` (`gameId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_playing` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `answerId` FOREIGN KEY (`answerId`) REFERENCES `answers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Points
CREATE TABLE `user_points` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(45) NOT NULL,
  `points` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `user_points_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `user_points` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Game points
CREATE TABLE `game_points` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gameId` VARCHAR(45) NOT NULL,
  `userId` VARCHAR(45) NOT NULL,
  `points` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_game_points_idx` (`userId` ASC) VISIBLE,
  INDEX `points_user_in_game_idx` (`gameId` ASC) VISIBLE,
  CONSTRAINT `user_game_points` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `points_user_in_game` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
