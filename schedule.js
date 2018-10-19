function gradeWeek(sun, mon, tue, wed, thu)
{
	this.schedules = [sun, mon, tue, wed, thu];
}

var gradeWeek3 = new gradeWeek(
	[[], ["math", "econ", "philo"], ["arab"], ["math", "econ", "philo", "comp"], ["comp", "philo", "econ"], ["math", "econ", "philo", "comp"], ["philo", "math", "comp", "econ"]],
	[["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["econ"], ["econ", "comp"], ["math", "econ", "philo"],	["philo", "comp", "econ"]],
	[["econ", "comp", "philo"], ["econ", "comp", "philo"], ["arab"], ["econ"], ["math", "econ", "philo", "comp"], ["kamat"],	["philo", "math", "comp", "econ"]],
	[["math", "econ", "philo", "comp"], ["math", "comp", "philo"], ["comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "philo"], ["math", "philo", "comp"], ["math", "econ"], ["math", "econ"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["philo", "math", "econ"]]
);
var gradeWeek2 = new gradeWeek(
	[[], ["comp", "math", "econ", "philo"], ["arab"], ["econ", "math", "philo"], ["econ", "comp", "philo"], ["math", "philo", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["comp", "philo"], ["math", "econ", "comp", "philo"], ["math", "philo"], ["math"], ["math", "comp"], ["philo", "comp", "math", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "comp", "econ", "philo"], ["arab"], ["philo", "math", "comp", "econ"], ["philo"], ["philo"], ["math", "comp", "philo", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "comp", "econ", "philo"], ["econ", "comp", "philo", "math"], ["econ"], ["econ"], ["comp", "math", "philo", "econ"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "philo"], ["econ", "comp", "philo"], ["math", "philo", "comp", "econ"], ["comp", "philo", "econ", "math"], [], [],	["philo", "math", "comp", "econ"]]
);
var gradeWeek1 = new gradeWeek(
	[[], ["arab"], ["comp", "philo", "econ"], ["comp"], ["comp", "philo", "econ"], ["comp", "philo", "econ"],	["philo", "math", "comp", "econ"]],
	[["econ"], ["econ"], ["comp", "philo", "econ"], ["comp"], ["comp", "philo", "econ"], ["comp", "philo", "econ"],	["philo", "math", "comp", "econ"]],
	[["arab"], ["comp", "philo", "econ"], ["philo"], ["philo"], ["comp", "philo", "econ"], ["comp", "philo", "econ"],	["philo", "math", "comp", "econ"]],
	[["comp", "philo", "econ"], ["comp"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["comp"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["econ"], ["philo", "math", "comp", "econ"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]]
);
