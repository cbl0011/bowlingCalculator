class ScoreModal extends React.Component {
	constructor(props) {
		super(props);
		this.setScore = this.setScore.bind(this);
	}

	setScore(c) {
		this.props.editFrame(c);
	}

	render() {
		return (
			React.createElement("div", {
					class: "modal",
					id: "scoreModal" + this.props.frameNo,
					tabindex: "-1",
					role: "dialog",
					"aria-labelledby": "scoreModalLabel",
					"aria-hidden": "true"
				},
				React.createElement("div", {
						class: "modal-dialog",
						role: "document"
					},
					React.createElement("div", {
							class: "modal-content"
						},
						React.createElement("div", {
								class: "modal-header"
							},
							React.createElement("button", {
									type: "button",
									class: "close",
									"data-dismiss": "modal",
									"aria-label": "Close"
								},
								React.createElement("span", {
									"aria-hidden": "true"
								}, "\xD7")),

							React.createElement("h5", {
								class: "modal-title",
								id: "scoreModalLabel"
							}, "Score")),

						React.createElement("div", {
								class: "modal-body"
							},
							React.createElement("div", {
									class: "modal-wrapper"
								},
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('-')
								}, "0"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('1')
								}, "1"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('2')
								}, "2"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('3')
								}, "3"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('4')
								}, "4"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('5')
								}, "5"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('6')
								}, "6"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('7')
								}, "7"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('8')
								}, "8"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('9')
								}, "9"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('/')
								}, "/"),
								React.createElement("button", {
									type: "button",
									class: "btn",
									"data-dismiss": "modal",
									onClick: () => this.setScore('X')
								}, "X"))),


						React.createElement("div", {
								class: "modal-footer"
							},
							React.createElement("button", {
								type: "button",
								class: "btn btn-secondary",
								"data-dismiss": "modal"
							}, "Close"))))));


	}
}


class Frame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			frameNo: parseInt(this.props.frame),
			frame1: "",
			frame2: "",
			frame3: "",
			frameHalf: 1
		};

		this.showModal = this.showModal.bind(this);
		this.editFrame = this.editFrame.bind(this);
	}

	showModal(h) {
		this.setState({
			frameHalf: h
		});

		$('#scoreModal' + this.state.frameNo).modal('show');
	}

	editFrame(c) {
		// console.log("Attempted to input: Frame " + this.state.frameNo + ", ball " + this.state.frameHalf + ": " + c);
		let fn = this.state.frameNo;
		let fh = this.state.frameHalf;
		let f1 = this.state.frame1;
		let f2 = this.state.frame2;
		let f3 = this.state.frame3;

		if (fn == 10) { // Frame 10
			if (c == 'X') { // Strike
				if (fh == 1) {
					f1 = 'X';
					if (f2 == '/') {
						f2 = '';
						f3 = '';
					}
				}
				else if (fh == 2) {
					if (f1 == 'X') {
						f2 = 'X';
					}
					else if (f1 == '') {
						f1 = 'X';
						f2 = '';
						f3 = '';
					}
				}
				else if (fh == 3) {
					if (f2 == 'X' || f2 == '/') {
						f3 = 'X';
					}
					else if (f1 == '' && f2 == '') {
						f1 = 'X';
						f2 = '';
						f3 = '';
					}
				}
			}
			else if (c == '/') { // Spare
				if (fh == 1) {
					if (f2 == '' && f3 == '') {
						f1 = '-';
						f2 = '/';
					}
				}
				else if (fh == 2) {
					if (f1 != 'X') {
						f2 = '/';
						if (f1 == '') {
							f1 = '-';
						}
					}
				}
				else if (fh == 3) {
					if (f1 == 'X' && f2 != 'X') {
						f3 = '/';
					}
					else if (f1 == 'X') {
						if (f2 == '') {
							f2 = '-';
						}
					}
				}
			}
			else if (fh == 1) {
				if (f2 == 'X') {
					f2 = '';
					f3 = '';
				}
				else if (parseInt(c) + parseInt(f2) >= 10) {
					f2 = '/';
				}
				f1 = c;
				if (f1 != 'X' && f2 != '/') {
					f3 = '';
				}
			}
			else if (fh == 2) {
				if (f1 == 'X') {
					if (parseInt(c) + parseInt(f3) >= 10) {
						f3 = '/';
					}
					f2 = c;
				}
				else {
					if (parseInt(f1) + parseInt(c) >= 10) {
						f2 = '/';
					}
					else {
						f2 = c;
					}
				}
				if (f1 != 'X' && f2 != '/') {
					f3 = '';
				}
			}
			else if (fh == 3) {
				if (f1 == 'X' && f2 != 'X' && f2 != '/') {
					if (parseInt(f2) + parseInt(c) >= 10) {
						f3 = '/';
					}
					else {
						f3 = c;
					}
				}
				else if (f2 == 'X' || f2 == '/') {
					f3 = c;
				}
				else if (f1 != 'X' && f2 != '/') {
					f3 = '';
				}
			}
		}
		else if (c == 'X') { // Strike, not frame 10
			f1 = '';
			f2 = 'X';
		}
		else if (c == '/') { // Spare, not frame 10
			if (fh == 2) {
				f2 = '/';
				if (f1 == '') {
					f1 = '-';
				}
			}
			else if (fh == 1) {
				if (f1 == '') {
					f1 = '-';
					f2 = '/';
				}
				else if (f2 != 'X' && f2 != '/') {
					f2 = '/';
				}
			}
		}
		else if (fh == 1) {
			if (f2 == 'X') {
				f2 = '';
			}
			else if (parseInt(c) + parseInt(f2) >= 10) {
				f2 = '/';
			}
			f1 = c;
		}
		else if (fh == 2) {
			if (parseInt(f1) + parseInt(c) >= 10) {
				f2 = '/';
			}
			else {
				f2 = c;
			}
		}

		this.setState({
				frame1: f1,
				frame2: f2,
				frame3: f3
			},

			() => this.props.onChange(this.state.frameNo, this.state.frame1, this.state.frame2, this.state.frame3));

	}

	render() {
		if (this.props.reset) {
			this.setState({
					frame1: "",
					frame2: "",
					frame3: "",
					frameHalf: 1
				},

				() => this.props.onChange(this.state.frameNo, "", "", ""));
		}
		if (this.state.frameNo == 10) {
			return (
				React.createElement("div", {
						class: "frame10"
					},
					React.createElement(ScoreModal, {
						editFrame: this.editFrame,
						frameNo: this.state.frameNo
					}),
					React.createElement("div", {
						class: "framenum"
					}, "10"),
					React.createElement("div", {
						class: "frame10roll1",
						onClick: () => this.showModal(1)
					}, this.state.frame1),
					React.createElement("div", {
						class: "frame10roll2",
						onClick: () => this.showModal(2)
					}, this.state.frame2),
					React.createElement("div", {
						class: "frame10roll3",
						onClick: () => this.showModal(3)
					}, this.state.frame3),
					React.createElement("div", {
						class: "framestotal"
					}, this.props.frameTotal)));


		}
		else {
			return (
				React.createElement("div", {
						class: "frame" + this.state.frameNo
					},
					React.createElement(ScoreModal, {
						editFrame: this.editFrame,
						frameNo: this.state.frameNo
					}),
					React.createElement("div", {
						class: "framenum"
					}, this.state.frameNo),
					React.createElement("div", {
						class: "frameroll1",
						onClick: () => this.showModal(1)
					}, this.state.frame1),
					React.createElement("div", {
						class: "frameroll2",
						onClick: () => this.showModal(2)
					}, this.state.frame2),
					React.createElement("div", {
						class: "framestotal"
					}, this.props.frameTotal)));


		}
	}
}


class Scores extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			frames: [
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				[]
			],
			frameTotals: ["", "", "", "", "", "", "", "", "", ""],
			highestFrame: 0,
			reset: false
		};

		this.updateScore = this.updateScore.bind(this);
		this.clear = this.clear.bind(this);
	}

	updateScore(frameNo, frame1, frame2, frame3) {

		if (frame1 == '' && frame2 == '' && frame3 == '') {
			this.setState({
				reset: false
			});

			return;
		}
		// console.log("Updating frame " + frameNo + " to [" + frame1 + " " + frame2 + " " + frame3 + "]")
		let newTotals = [...this.state.frameTotals];
		let newFrames = [...this.state.frames];

		if (frame1 == '-') {
			frame1 = '0';
		}
		if (frame2 == '-') {
			frame2 = '0';
		}
		if (frame3 == '-') {
			frame3 = '0';
		}

		newFrames[frameNo - 1][0] = frame1;
		newFrames[frameNo - 1][1] = frame2;
		if (frameNo == 10) {
			newFrames[frameNo - 1][2] = frame3;
		}

		let lastFrameScored = 0;
		for (let i = 9; i >= 0; i--) {
			if (newFrames[i].length > 0) {
				lastFrameScored = i;
				break;
			}
		}

		if (lastFrameScored > this.state.highestFrame) {
			for (let i = this.state.highestFrame; i <= lastFrameScored; i++) {
				if (i == 0 && newTotals[i] == '') {
					newTotals[i] = 0;
				}
				else {
					newTotals[i] = newTotals[i] == '' ? parseInt(newTotals[i - 1]) : parseInt(newTotals[i]);
				}
			}
			this.setState({
				highestFrame: lastFrameScored
			});
		}

		for (let i = 0; i <= lastFrameScored; i++) {
			let curFrame = 0;
			let preFrame = 0;
			if (i == 9) { // Tenth frame
				let nf = newFrames[i];
				preFrame = newTotals[i - 1];
				if (nf.length != 0) {
					if (nf[0] == 'X') {
						curFrame += 10;
						if (nf[1] == 'X') {
							curFrame += 10;
							if (nf[2] == 'X') {
								curFrame += 10;
							}
							else if (nf[2] != '') {
								curFrame += parseInt(nf[2]);
							}
						}
						else if (nf[2] == '/') {
							curFrame += 10;
						}
						else if (nf[1] != '') {
							curFrame += parseInt(nf[1]);
							if (nf[2] != '') {
								curFrame += parseInt(nf[2]);
							}
						}
					}
					else if (nf[1] == '/') {
						curFrame += 10;
						if (nf[2] == 'X') {
							curFrame += 10;
						}
						else if (nf[2] != '') {
							curFrame += parseInt(nf[2]);
						}
					}
					else if (nf[0] != '') {
						curFrame += parseInt(nf[0]);
						if (nf[1] != '') {
							curFrame += parseInt(nf[1]);
						}
					}
				}
			}
			else if (i == 7 && newFrames[i][1] == 'X' && newFrames[i + 1][1] == 'X') {
				preFrame = newTotals[i - 1];
				curFrame += 20;
				if (newFrames[i + 2].length != 0) {
					if (newFrames[i + 2][0] == 'X') {
						curFrame += 10;
					}
					else if (newFrames[i + 2][0] != '') {
						curFrame += parseInt(newFrames[i + 2][0]);
					}
				}
			}
			else if (i == 8 && (newFrames[i][1] == '/' || newFrames[i][1] == 'X')) {
				preFrame = newTotals[i - 1];
				if (newFrames[i][1] == '/') {
					curFrame += 10;
					if (newFrames[i + 1].length != 0) {
						if (newFrames[i + 1][0] == 'X' || newFrames[i + 1][0] == '/') {
							curFrame += 10;
						}
						else if (newFrames[i + 1][0] != '') {
							curFrame += parseInt(newFrames[i + 1][0]);
						}
					}
				}
				else if (newFrames[i][1] == 'X') {
					curFrame += 10;
					if (newFrames[i + 1].length != 0) {
						if (newFrames[i + 1][0] == 'X') {
							curFrame += 10;
							if (newFrames[i + 1][1] == 'X') {
								curFrame += 10;
							}
							else if (newFrames[i + 1][1] != '') {
								curFrame += parseInt(newFrames[i + 1][1]);
							}
						}
						else if (newFrames[i + 1][1] == '/') {
							curFrame += 10;
						}
						else if (newFrames[i + 1][0] != '') {
							curFrame += parseInt(newFrames[i + 1][0]);
							if (newFrames[i + 1][1] != '') {
								curFrame += parseInt(newFrames[i + 1][1]);
							}
						}
					}
				}
			}
			else if (i == 0) { // First frame
				preFrame = 0;
				if (newFrames[i].length == 0) {
					curFrame = 0;
				}
				else if (newFrames[i][0] != '') {
					if (newFrames[i][1] == '/') {
						curFrame = 10;
					}
					else {
						curFrame += parseInt(newFrames[i][0]);
						if (newFrames[i][1] != '') {
							curFrame += parseInt(newFrames[i][1]);
						}
					}
				}
				else if (newFrames[i][1] == 'X') {
					curFrame = 10;
				}
				else if (newFrames[i][1] != '') {
					curFrame += parseInt(newFrames[i][1]);
				}
				if (newFrames[i + 1].length != 0) {
					if (newFrames[i][1] == 'X') {
						if (newFrames[i + 1][1] == 'X') {
							curFrame += 10;
							if (newFrames[i + 2].length != 0 && newFrames[i + 2][1] == 'X') {
								curFrame += 10;
							}
							else if (newFrames[i + 2].length != 0 && newFrames[i + 2][0] != '') {
								curFrame += parseInt(newFrames[i + 2][0]);
							}
						}
						else if (newFrames[i + 1][1] == '/') {
							curFrame += 10;
						}
						else {
							if (newFrames[i + 1][0] != '') {
								curFrame += parseInt(newFrames[i + 1][0]);
							}
							if (newFrames[i + 1][1] != '') {
								curFrame += parseInt(newFrames[i + 1][1]);
							}
						}
					}
					if (newFrames[i][1] == '/') {
						if (newFrames[i + 1][1] == '/') {
							if (newFrames[i + 1][0] != '') {
								curFrame += parseInt(newFrames[i + 1][0]);
							}
						}
						else if (newFrames[i + 1][1] == 'X') {
							curFrame += 10;
						}
						else if (newFrames[i + 1][0] != '') {
							curFrame += parseInt(newFrames[i + 1][0]);
						}
					}
				}
			}
			else {
				preFrame = newTotals[i - 1];

				if (newFrames[i][1] == '/') {
					curFrame = 10;
					if (newFrames[i + 1].length != 0) {
						if (newFrames[i + 1][0] != '') {
							curFrame += parseInt(newFrames[i + 1][0]);
						}
						else if (newFrames[i + 1][1] == 'X') {
							curFrame += 10;
						}
					}
				}
				else if (newFrames[i][1] == 'X') {
					curFrame = 10;
					if (i < 9 && newFrames[i + 1].length != 0) {
						if (newFrames[i + 1][1] == 'X') {
							curFrame += 10;
							if (i < 7 && newFrames[i + 2].length != 0) {
								if (newFrames[i + 2][1] == 'X') {
									curFrame += 10;
								}
								else if (newFrames[i + 2][0] != '') {
									curFrame += parseInt(newFrames[i + 2][0]);
								}
							}
							else if (i == 7 && newFrames[i + 1].length != 0) {
								if (newFrames[i + 1][0] == 'X') {
									curFrame += 10;
								}
								else if (newFrames[i + 1][0] != '') {
									curFrame += parseInt(newFrames[i + 1][0]);
								}
							}
						}
						else if (newFrames[i + 1][1] == '/') {
							curFrame += 10;
						}
						else {
							if (newFrames[i + 1][0] != '') {
								curFrame += parseInt(newFrames[i + 1][0]);
							}
							if (newFrames[i + 1][1] != '') {
								curFrame += parseInt(newFrames[i + 1][1]);
							}
						}
					}
				}
				else {
					if (newFrames[i].length != 0) {
						curFrame = 0;
						if (newFrames[i][0] != '') {
							curFrame += parseInt(newFrames[i][0]);
						}
						if (newFrames[i][1] != '') {
							curFrame += parseInt(newFrames[i][1]);
						}
					}
				}
			}
			// console.log("Tested frame " + i + ": " + curFrame + "  " + preFrame + " --- total of " + parseInt(preFrame + curFrame));
			newTotals[i] = preFrame + curFrame;
		}

		this.setState({
			frameTotals: [...newTotals],
			reset: false
		});

	}

	clear() {
		this.setState({
			frames: [
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				[]
			],
			frameTotals: ["", "", "", "", "", "", "", "", "", ""],
			highestFrame: 0,
			reset: true
		});

	}

	render() {
		return (
			React.createElement("div", {
					class: "wrapper"
				},
				React.createElement(Frame, {
					frame: "1",
					reset: this.state.reset,
					onChange: this.updateScore,
					frameTotal: this.state.frameTotals[0]
				}),
				React.createElement(Frame, {
					frame: "2",
					reset: this.state.reset,
					onChange: this.updateScore,
					frameTotal: this.state.frameTotals[1]
				}),
				React.createElement(Frame, {
					frame: "3",
					reset: this.state.reset,
					onChange: this.updateScore,
					frameTotal: this.state.frameTotals[2]
				}),
				React.createElement(Frame, {
					frame: "4",
					reset: this.state.reset,
					onChange: this.updateScore,
					frameTotal: this.state.frameTotals[3]
				}),
				React.createElement(Frame, {
					frame: "5",
					reset: this.state.reset,
					onChange: this.updateScore,
					frameTotal: this.state.frameTotals[4]
				}),
				React.createElement(Frame, {
					frame: "6",
					reset: this.state.reset,
					onChange: this.updateScore,
					frameTotal: this.state.frameTotals[5]
				}),
				React.createElement(Frame, {
					frame: "7",
					reset: this.state.reset,
					onChange: this.updateScore,
					frameTotal: this.state.frameTotals[6]
				}),
				React.createElement(Frame, {
					frame: "8",
					reset: this.state.reset,
					onChange: this.updateScore,
					frameTotal: this.state.frameTotals[7]
				}),
				React.createElement(Frame, {
					frame: "9",
					reset: this.state.reset,
					onChange: this.updateScore,
					frameTotal: this.state.frameTotals[8]
				}),
				React.createElement(Frame, {
					frame: "10",
					reset: this.state.reset,
					onChange: this.updateScore,
					frameTotal: this.state.frameTotals[9]
				}),
				React.createElement("button", {
					class: "btn btn-clear",
					reset: this.state.reset,
					onClick: this.clear
				}, "Clear")));


	}
}


ReactDOM.render(React.createElement(Scores, null), document.getElementById("bowling-scores"));

$(".btn-clear").mouseup(function () {
	$(this).blur();
});