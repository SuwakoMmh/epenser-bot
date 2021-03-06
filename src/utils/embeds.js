import { RichEmbed } from 'discord.js';
import load from './load';

const { images } = load('global.json');

export function err(title) {
	const embed = new RichEmbed()
		.setColor(0xdb1348)
		.setImage(images.error[Math.floor(Math.random() * images.error.length)])
		.setFooter("Ce message s'autodétruira dans une minute.", images.mainIcon)
		.setTimestamp();
	if (title) embed.setTitle(title);
	return embed;
}

export function timeDelete(message) {
	return new Promise((resolve, reject) =>
		setTimeout(() => resolve(message.delete()), 60 * 1000)
	);
}
