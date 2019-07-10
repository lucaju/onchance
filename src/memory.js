let _currentSubject = '';

export const getCurrentSubject = () => {
	return _currentSubject;
};

export const setCurrentSubject = value => {
	_currentSubject = value;
	return _currentSubject;
};