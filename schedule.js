function gradeWeek(sun, mon, tue, wed, thu)
{
	this.schedules = [sun, mon, tue, wed, thu];
}

var gradeWeek3 = new gradeWeek(
	[[], [], ["math", "comp", "philo", "econ"], ["math", "econ", "philo", "comp"], ["comp", "philo", "econ", "math"], ["math", "econ", "philo", "comp"], ["philo", "math", "comp", "econ"]],
	[["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["math", "econ", "philo", "comp"], ["econ", "math", "philo", "comp"], ["econ", "comp", "math", "philo"], ["math", "econ", "philo", "comp"],	["philo", "comp", "econ", "math"]],
	[["philo", "econ"], ["philo", "econ"], ["philo", "econ"], ["philo", "econ"], ["philo", "econ"], ["philo", "econ"],	["philo", "econ"]],
	[["philo", "econ"], ["philo", "econ"], ["philo", "econ"], ["math"], ["math"], [ "math"], []],
	[["math"], ["math"], ["math"], ["math"], ["math"], ["math"], ["math"]]
);
var gradeWeek2 = new gradeWeek(
	[["math", "philo"], ["math", "philo"], ["math", "philo"], ["math", "philo"], ["math", "philo"], ["math", "philo"],	["philo", "math"]],
	[["philo", "math", "econ"], ["philo", "math", "econ"], ["philo", "math", "econ"], ["philo", "math", "econ"], ["philo", "math", "econ"], ["philo", "comp", "math", "econ"],	["philo", "math", "econ"]],
	[["math", "comp", "econ", "philo"], ["math", "comp", "econ", "philo"], ["philo", "math", "comp", "econ"], ["math", "comp", "econ", "philo"], ["math", "comp", "econ", "philo"], ["math", "comp", "philo", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "comp", "econ", "philo"], ["econ", "comp", "philo", "math"], ["math", "comp", "econ", "philo"], ["math", "comp", "econ", "philo"], ["comp", "math", "philo", "econ"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "comp", "econ", "philo"], ["math", "comp", "econ", "philo"], ["math", "philo", "comp", "econ"], [], [], [],	[]]
);
var gradeWeek1 = new gradeWeek(
	[[], ["comp"], ["comp"], ["comp"], ["comp"], ["comp"],	["comp"]],
	[["comp"], ["comp"], ["comp"], ["comp"], ["comp"], ["comp", "philo", "econ", "math"],	["comp"]],
	[["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"],	["comp"]],
	[["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["philo", "math", "comp", "econ"],	[]],
	[["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["comp", "philo", "econ"], ["philo", "math", "comp", "econ"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]]
);

