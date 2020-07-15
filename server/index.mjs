import app from './server.mjs';
import chalk from 'chalk';
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(chalk.green(`Onchance listening on port ${port}!`));
});
