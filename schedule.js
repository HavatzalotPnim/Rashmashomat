function gradeWeek(sun, mon, tue, wed, thu)
{
	this.schedules = [sun, mon, tue, wed, thu];
}

var gradeWeek3 = new gradeWeek(
	[[], ["math", "econ", "philo"], ["arab"], ["math", "econ", "philo", "comp"], ["comp", "philo", "econ"], ["math", "econ", "philo", "comp"], ["philo", "math", "comp", "econ"]],
	[["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["econ"], ["econ", "comp"], ["math", "econ", "philo"],	["philo", "math", "comp", "econ"]],
	[["econ", "comp", "philo"], ["econ", "comp", "philo"], ["arab"], ["econ"], ["math", "econ", "philo", "comp"], ["kamat"],	["philo", "math", "comp", "econ"]],
	[["math", "econ", "philo", "comp"], ["math", "comp", "philo"], ["comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "philo"], ["math", "philo", "comp"], ["math", "econ"], ["math", "econ"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["philo", "math", "comp", "econ"]]
);
var gradeWeek2 = new gradeWeek(
	[[], [], ["arab"], ["comp", "econ"], [], [],	["philo", "math", "comp", "econ"]],
	[[], [], ["math", "econ"], [], ["philo"], ["philo", "comp"],	["philo", "math", "comp", "econ"]],
	[[], [], [], ["math", "philo", "comp"], ["math", "philo", "comp"], [],	["philo", "math", "comp", "econ"]],
	[[], ["econ"], ["philo"], ["econ", "comp"], ["comp"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "econ", "comp"], ["econ"], ["math", "philo", "comp"], ["comp", "philo", "econ"], [], [],	["philo", "math", "comp", "econ"]]
);
var gradeWeek1 = new gradeWeek(
	[[], ["arab"], ["comp", "philo", "econ"], ["comp"], ["comp", "philo", "econ"], ["comp", "philo", "econ"],	["philo", "math", "comp", "econ"]],
	[["econ"], ["econ"], ["comp", "philo", "econ"], ["comp"], ["comp", "philo", "econ"], ["comp", "philo", "econ"],	["philo", "math", "comp", "econ"]],
	[["arab"], ["comp", "philo", "econ"], ["philo"], ["philo"], ["comp", "philo", "econ"], ["comp", "philo", "econ"],	["philo", "math", "comp", "econ"]],
	[["comp", "philo", "econ"], ["comp"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["comp"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["econ"], ["philo", "math", "comp", "econ"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]]
);
