import mongoose from 'mongoose';

const settingsSchema = mongoose.Schema({
	
}, {
	timestamps: true,
	strict: false
});

settingsSchema.methods.toJSON = function () {
	const settings = this.toObject();
	delete settings._id;
	return settings;
};

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
