const random = (min, max) => Math.floor(Math.random()*(max-min)+min);

class replierClass {
    onWhichParrot(username){
        const variant = random(1,7);
        const pekBase = {
            1:["https://i.pinimg.com/originals/d2/17/88/d21788aef69c83faaf75c7bcc879f0d8.jpg", `@${username} сегодня ты милый папуга!`],
            2:["https://i.pinimg.com/564x/fa/5f/3b/fa5f3b17554a16ce9d3c538cab0a8c98.jpg", `@${username} сегодня ты сонный папуга!`],
            3:["https://i.pinimg.com/564x/52/2e/27/522e27725ff71c5f0bd07b5fecda06e2.jpg", `@${username} сегодня ты папуг-охотник`],
            4:["https://i.pinimg.com/564x/cb/1b/99/cb1b9952bf0ef94aff3b7348e428bbe2.jpg ", `@${username} сегодня ты злой папуга (не петушись!)`],
            5:["http://3.bp.blogspot.com/-lGDr_61JzBo/UJmOKbIJJxI/AAAAAAAAAHQ/7kqZRSq5JBg/s1600/6a00d8341c022653ef01156f7f145a970c-400wi.jpg", `@${username} сегодня ты папуга-программезд!`],
            6:["https://i.pinimg.com/originals/a3/a6/1d/a3a61dc994e958dc1118261b769776b7.jpg", `@${username} ты не папуга, пидор.`],
        };
        return pekBase[variant];
    }
};

module.exports = replierClass;