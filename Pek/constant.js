export const PARROT_TYPES = ["Lovebird", "Kakariki", "Caique"];
const newParrot = (img, text) => ({img, text});

export const FEED_EXPIRES_IN = 28800000;
export const  MINUTE_IN_MS = 6 * 1000;
export const WHICH_PARROT = [
    newParrot(`https://i.pinimg.com/originals/d2/17/88/d21788aef69c83faaf75c7bcc879f0d8.jpg`,
        `сегодня ты милый папуга!`),
    newParrot(`https://i.pinimg.com/564x/fa/5f/3b/fa5f3b17554a16ce9d3c538cab0a8c98.jpg`,
        `сегодня ты сонный папуга!`),
    newParrot(`https://i.pinimg.com/564x/52/2e/27/522e27725ff71c5f0bd07b5fecda06e2.jpg`,
        `сегодня ты папуг-охотник!`),
    newParrot(`https://i.pinimg.com/564x/cb/1b/99/cb1b9952bf0ef94aff3b7348e428bbe2.jpg`,
        `сегодня ты злой папуга (не петушись!)`),
    newParrot(`http://3.bp.blogspot.com/-lGDr_61JzBo/UJmOKbIJJxI/AAAAAAAAAHQ/7kqZRSq5JBg/s1600/6a00d8341c022653ef01156f7f145a970c-400wi.jpg`,
        `сегодня ты папуга-программезд!`),
    newParrot(`https://i.pinimg.com/564x/ae/de/39/aede393e36f661fd1bf4114edfd719ba.jpg`,
        `ты не папуга...`),
];