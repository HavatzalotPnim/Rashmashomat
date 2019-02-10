function gradeWeek(sun, mon, tue, wed, thu)
{
	this.schedules = [sun, mon, tue, wed, thu];
}

var gradeWeek3 = new gradeWeek(
	[[], ["econ"], ["math", "comp", "philo", "econ"], ["math", "econ", "philo", "comp"], ["philo", "math"], ["math", "econ", "philo", "comp"], ["philo", "math", "comp", "econ"]],
	[["math", "econ", "philo", "comp"], ["econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["econ", "math", "philo", "comp"], ["econ", "comp", "math", "philo"], ["math", "econ", "philo", "comp"],	["philo", "comp", "econ", "math"]],
	[["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "comp"], ["math", "econ"], ["math", "econ", "philo", "comp"], ["kamat"],	["math", "econ", "philo", "comp"]],
	[["philo"], ["math", "comp"], ["philo", "econ","math"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"]],
	[["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math", "comp"], ["math", "comp"], ["math", "philo", "comp"], ["math", "econ", "philo", "comp"], ["philo", "comp"]]
);
var gradeWeek2 = new gradeWeek(
	[["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["econ"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"],	["math", "econ", "philo", "comp"]],
	[["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["philo", "math", "econ"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["comp"],	["math", "econ", "philo", "comp"]],
	[["math", "comp", "econ", "philo"], ["math", "comp", "econ", "philo"], ["philo", "math", "comp", "econ"], ["math", "comp"], ["math", "comp", "philo"], ["math", "comp", "philo", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "comp", "econ", "philo"], ["econ", "comp", "philo", "math"], ["comp", "philo"], ["math", "comp", "philo"], ["philo", "econ"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "comp", "econ", "philo"], ["math", "comp", "econ"], ["math", "philo", "comp", "econ"], ["econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"],	["math", "econ", "philo", "comp"]]
);
var gradeWeek1 = new gradeWeek(
	[["math", "econ", "philo", "comp"], ["arab"], ["math", "econ", "philo", "comp"], ["math", "econ"], ["math"], ["math"],	["math", "econ", "philo"]],
	[["philo"], ["math", "econ", "philo", "comp"], ["philo"], ["comp"], ["math", "econ", "philo", "comp"], ["comp", "philo", "econ", "math"],	["math", "econ", "philo", "comp"]],
	[["comp", "philo", "econ"], ["comp", "philo", "econ"], ["arab"], ["comp", "math"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"],	["math", "econ", "philo", "comp"]],
	[["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"],	["math", "econ", "philo", "comp"]],
	[["math", "econ", "philo", "comp"], ["comp", "philo"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["philo", "math", "comp", "econ"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]]
);

