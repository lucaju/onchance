export const initialSpeech = `Congratulations on your new job!
You were just hired as a journalist and your first assignment is to collaborate with your colleague Jana on a story about predictive algorithms.
Help Jana writing this story with the research material she’ll show you.`;

export const buildVideoMetadataSpeech = (video) => {

    const msg = [
        `Title: ${video.title}\n`,
        `Author: ${video.author}`,
        `Year: ${video.year}`,
        `Genre: ${video.genre}`
    ];

    // let msg = `Title: ${video.title}`;
    // if (video.author) msg += `Author: ${video.author}\n`;
    // if (video.year) msg += `Year: ${video.year}\n`;
    // if (video.genre) msg += `Genre: ${video.genre}\n`;

    return msg;
};