function gradeWeek(sun, mon, tue, wed, thu)
{
	this.schedules = [sun, mon, tue, wed, thu];
}

var gradeWeek3 = new gradeWeek(
	[[], ["math", "econ"], ["arab"], [], ["math", "comp", "philo"], [],	["philo", "math", "comp", "econ"]],
	[["econ", "comp", "philo"], ["econ", "comp"], [], [], [], [],	["philo", "math", "comp", "econ"]],
	[[], [], ["math", "econ", "comp"], ["econ", "comp"], [], ["kamat"],	["philo", "math", "comp", "econ"]],
	[["philo", "math"], ["math"], ["econ", "math"], ["math", "comp", "econ"], [], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "econ"], [], ["math", "comp", "philo"], [], [], [],	["philo", "math", "comp", "econ"]]
);
var gradeWeek2 = new gradeWeek(
	[[], [], ["arab"], ["comp", "econ"], [], [],	["philo", "math", "comp", "econ"]],
	[[], [], ["math", "econ"], [], ["philo"], ["philo", "comp"],	["philo", "math", "comp", "econ"]],
	[[], [], [], ["math", "philo", "comp"], ["math", "philo", "comp"], [],	["philo", "math", "comp", "econ"]],
	[[], ["econ"], ["philo"], ["econ", "comp"], ["comp"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["math", "econ", "comp"], ["econ"], ["math", "philo", "comp"], ["comp", "philo", "econ"], [], [],	["philo", "math", "comp", "econ"]]
);
var gradeWeek1 = new gradeWeek(
	[[], ["arab"], [], ["math", "econ"], [], ["math", "philo"],	["philo", "math", "comp", "econ"]],
	[["philo"], ["philo"], ["math", "econ"], ["comp"], [], [],	["philo", "math", "comp", "econ"]],
	[["math", "philo", "econ"], ["philo"], [], ["math", "philo"], [], [],	["philo", "math", "comp", "econ"]],
	[[], [], [], ["math"], [], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]],
	[["econ"], ["math", "econ", "philo"], [], ["philo", "math", "comp", "econ"], ["philo", "math", "comp", "econ"], ["philo", "math", "comp", "econ"],	["philo", "math", "comp", "econ"]]
);
