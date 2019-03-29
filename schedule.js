function gradeWeek(sun, mon, tue, wed, thu)
{
	this.schedules = [sun, mon, tue, wed, thu];
}

var gradeWeek3 = new gradeWeek(
    [   // Sunday
        [],                                 // 8-10
        ["econ"],                           // 10-12
        ["math", "comp", "philo", "econ"],  // 12-14
        ["math", "econ", "philo", "comp"],  // 14-16
        ["philo", "math"],                  // 16-18
        ["math", "econ", "philo", "comp"],  // 18-20
        ["philo", "math", "comp", "econ"],  // כונן יום 1
        ["philo", "math", "comp", "econ"]   // כונן יום 2
    ],
	[   // Monday
        ["math", "econ", "philo", "comp"],
        ["econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["econ", "math", "philo", "comp"],
        ["econ", "comp", "math", "philo"],
        ["math", "econ", "philo", "comp"],
        ["philo", "comp", "econ", "math"],
        ["philo", "comp", "econ", "math"]
    ],
	[   // Tuesday
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "comp"],
        ["math", "econ"],
        ["math", "econ", "philo", "comp"],
        ["kamat"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"]
    ],
	[   // Wednesday
        ["philo"],
        ["math", "comp"],
        ["philo", "econ", "math"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"]
    ],
    [   // Thursday
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "comp"], ["math", "comp"],
        ["math", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["philo", "comp"],
        ["philo", "comp"]
    ]
);
var gradeWeek2 = new gradeWeek(
	[   // Sunday
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["econ"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"]
    ],
    [   // Monday
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["philo", "math", "econ"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"]
    ],
    [   // Tuesday
        ["math", "comp", "econ", "philo"],
        ["math", "comp", "econ", "philo"],
        ["philo", "math", "comp", "econ"],
        ["math", "comp"],
        ["math", "comp", "philo"],
        ["math", "comp", "philo", "econ"],
        ["philo", "math", "comp", "econ"],
        ["philo", "math", "comp", "econ"]
    ],
    [   // Wednesday
        ["math", "comp", "econ", "philo"],
        ["econ", "comp", "philo", "math"],
        ["comp", "philo"],
        ["math", "comp", "philo"],
        ["philo", "econ"],
        ["philo", "math", "comp", "econ"],
        ["philo", "math", "comp", "econ"],
        ["philo", "math", "comp", "econ"]
    ],
    [   // Thursday
        ["math", "comp", "econ", "philo"],
        ["math", "comp", "econ"],
        ["math", "philo", "comp", "econ"],
        ["econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"]
    ]
);
var gradeWeek1 = new gradeWeek(
    [   // Sunday
        ["math", "econ", "philo", "comp"],
        ["arab"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ"],
        ["math"],
        ["math"],
        ["math", "econ", "philo"],
        ["math", "econ", "philo"]
    ],
    [   // Monday
        ["philo"],
        ["math", "econ", "philo", "comp"],
        ["philo"],
        ["comp"],
        ["math", "econ", "philo", "comp"],
        ["comp", "philo", "econ", "math"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"]
    ],
    [   // Tuesday
        ["comp", "philo", "econ"],
        ["comp", "philo", "econ"],
        ["arab"],
        ["comp", "math"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"]
    ],
    [   // Wednesday
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"]
    ],
    [   // Thursday
        ["math", "econ", "philo", "comp"],
        ["comp", "philo"],
        ["math", "econ", "philo", "comp"],
        ["math", "econ", "philo", "comp"],
        ["philo", "math", "comp", "econ"],
        ["philo", "math", "comp", "econ"],
        ["philo", "math", "comp", "econ"],
        ["philo", "math", "comp", "econ"]
    ]
);

