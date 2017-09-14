export default function (error) {
	console.log(error.toString())
	this.emit('end')
}