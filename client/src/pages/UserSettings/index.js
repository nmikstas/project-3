import React from "react";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";
import ErrorBox from "../../components/ErrorBox";
import "./style.css";

class UserSettings extends React.Component
{
    //Game input values. Matches the corresponding game requests.
    static get IN_ROTATE_CW()  { return 1 };
    static get IN_ROTATE_CCW() { return 2 };
    static get IN_LEFT()       { return 3 };
    static get IN_RIGHT()      { return 4 };
    static get IN_DOWN()       { return 5 };
    static get IN_PAUSE()      { return 6 };

    //Input types.
    static get IT_KEYBOARD()        { return 0 };
    static get IT_GAMEPAD_ANALOG()  { return 1 };
    static get IT_GAMEPAD_DIGITAL() { return 2 };
    static get IT_GAMEPAD_DPAD()    { return 3 };

    state =
    {
        debug:    true,
        username: "",
        password: "",
        confirm:  "",

        downBtn:       0,
        downIndex:     0,
        downType:      0,
        downText:      "Down Input",
        downClassName: "ready-class",

        leftBtn:       0,
        leftIndex:     0,
        leftType:      0,
        leftText:      "Left Input",
        leftClassName: "ready-class",

        rightBtn:       0,
        rightIndex:     0,
        rightType:      0,
        rightText:      "Right Input",
        rightClassName: "ready-class",

        flipCWBtn:       0,
        flipCWIndex:     0,
        flipCWType:      0,
        flipCWText:      "Rotate CW Input",
        flipCWClassName: "ready-class",

        flipCCWBtn:       0,
        flipCCWIndex:     0,
        flipCCWType:      0,
        flipCCWText:      "Rotate CCW Input",
        flipCCWClassName: "ready-class",

        pauseBtn:       0,
        pauseIndex:     0,
        pauseType:      0,
        pauseText:      "Pause Input",
        pauseClassName: "ready-class",

        errorTitle:   "",
        errorMessage: "",
        errorType:    "alert-danger",
        isError:      false,

        inputTitle:   "Settings Saved!",
        inputMessage: "Save successful.",
        inputType:    "alert-success",
        isInputError: false,

        //Gamepad variables.
        turbo:         false,
        firstUpdate:   true,
        controller:    {},
        buttonsCache:  [],
        buttonsStatus: [],
        axesStatus:    [],
        dPads:         [],

        //Keyboard variables.
        keysPressed: {},

        //Input configuration variables.
        updateTimer:    null,
        configTimer:    null,
        configButton:   null,
        configCallback: null,

        //Button and status text.
        leftStatus:   "Ready",
        rightStatus:  "Ready",
        downStatus:   "Ready",
        cwStatus:     "Ready",
        ccwStatus:    "Ready",
        pauseStatus:  "Ready",
        leftBtnText:  "Change",
        rightBtnText: "Change",
        downBtnText:  "Change",
        cwBtnText:    "Change",
        ccwBtnText:   "Change",
        pauseBtnText: "Change"
    }

    componentDidMount = () =>
    {
        //Check if the user is logged in or not.
        API.verify()
        .then((res) =>
        {
            //If not, boot 'em out!
            if(res.data.notLoggedIn)
            {
                window.location.href = "/denied";
            }

            if(this.state.debug)console.log(res.data);

            //Set the state with the user data.
            this.setState(
            {
                username: res.data.username,

                downBtn:   res.data.downBtn,
                downIndex: res.data.downIndex,
                downType:  res.data.downType,

                leftBtn:   res.data.leftBtn,
                leftIndex: res.data.leftIndex,
                leftType:  res.data.leftType,

                rightBtn:   res.data.rightBtn,
                rightIndex: res.data.rightIndex,
                rightType:  res.data.rightType,

                flipCWBtn:   res.data.flipCWBtn,
                flipCWIndex: res.data.flipCWIndex,
                flipCWType:  res.data.flipCWType,

                flipCCWBtn:   res.data.flipCCWBtn,
                flipCCWIndex: res.data.flipCCWIndex,
                flipCCWType:  res.data.flipCCWType,

                pauseBtn:   res.data.pauseBtn,
                pauseIndex: res.data.pauseIndex,
                pauseType:  res.data.pauseType
            });

            this.setState(
            {
                downText:    this.inputText(this.state.downBtn,    this.state.downType),
                leftText:    this.inputText(this.state.leftBtn,    this.state.leftType),
                rightText:   this.inputText(this.state.rightBtn,   this.state.rightType),
                flipCWText:  this.inputText(this.state.flipCWBtn,  this.state.flipCWType),
                flipCCWText: this.inputText(this.state.flipCCWBtn, this.state.flipCCWType),
                pauseText:   this.inputText(this.state.pauseBtn,   this.state.pauseType)
            });

            this.init();
        })
        .catch(err =>
        {
            console.log(err);
            window.location.href = "/denied";
        });
    }

    componentWillUnmount = () =>
    {
        clearInterval(this.state.updateTimer);
        clearInterval(this.state.configTimer);
        window.removeEventListener("gamepadconnected", this.connect);
        window.removeEventListener("gamepaddisconnected", this.disconnect);
        document.removeEventListener('keyup', this.doKeyUp);
        document.removeEventListener('keydown', this.doKeyDown);
        window.removeEventListener('focus', this.changeFocus);
    }

    configClick = (event) =>
    {
        let id = event.target.id;

        let configBtn;
        let status;

        switch(id)
        {
            case "left-btn":
                configBtn = UserSettings.IN_LEFT;
                status    = this.state.leftStatus;
                break;
            case "right-btn":
                configBtn = UserSettings.IN_RIGHT;
                status    = this.state.rightStatus;
                break;
            case "down-btn":
                configBtn = UserSettings.IN_DOWN;
                status    = this.state.downStatus;
                break;
            case "rotate-cw-btn":
                configBtn = UserSettings.IN_ROTATE_CW;
                status    = this.state.cwStatus;
                break;
            case "rotate-ccw-btn":
                configBtn = UserSettings.IN_ROTATE_CCW;
                status    = this.state.ccwStatus;
                break;
            default:
                configBtn = UserSettings.IN_PAUSE;
                status    = this.state.pauseStatus;
                break;
        }

        if(status !== "Listening")
        {
            //Cancel any other pending actions.
            this.setState(
            {
                leftStatus:       this.state.leftStatus === "Listening" ? "Ready" : this.state.leftStatus,
                leftBtnText:      "Change",
                leftClassName:    this.state.leftClassName === "listen-class" ? "ready-class" : this.state.leftClassName,
                rightStatus:      this.state.rightStatus === "Listening" ? "Ready" : this.state.rightStatus,
                rightBtnText:     "Change",
                rightClassName:   this.state.rightClassName === "listen-class" ? "ready-class" : this.state.rightClassName,
                downStatus:       this.state.downStatus === "Listening" ? "Ready" : this.state.downStatus,
                downBtnText:      "Change",
                downClassName:    this.state.downClassName === "listen-class" ? "ready-class" : this.state.downClassName,
                cwStatus:         this.state.cwStatus === "Listening" ? "Ready" : this.state.cwStatus,
                cwBtnText:        "Change",
                flipCWClassName:  this.state.flipCWClassName === "listen-class" ? "ready-class" : this.state.flipCWClassName,
                ccwStatus:        this.state.ccwStatus === "Listening" ? "Ready" : this.state.ccwStatus,
                ccwBtnText:       "Change",
                flipCCWClassName: this.state.flipCCWClassName === "listen-class" ? "ready-class" : this.state.flipCCWClassName,
                pauseStatus:      this.state.pauseStatus === "Listening" ? "Ready" : this.state.pauseStatus,
                pauseBtnText:     "Change",
                pauseClassName:   this.state.pauseClassName === "listen-class" ? "ready-class" : this.state.pauseClassName
            });

            //Set the proper text values and classes.
            switch(id)
            {
                case "left-btn":
                    this.setState(
                    {
                        leftStatus:    "Listening",
                        leftBtnText:   "Cancel",
                        leftClassName: "listen-class"
                    });
                    break;
                case "right-btn":
                    this.setState(
                    {
                        rightStatus:    "Listening",
                        rightBtnText:   "Cancel",
                        rightClassName: "listen-class"
                    });
                    break;
                case "down-btn":
                    this.setState(
                    {
                        downStatus:    "Listening",
                        downBtnText:   "Cancel",
                        downClassName: "listen-class"
                    });
                    break;
                case "rotate-cw-btn":
                    this.setState(
                    {
                        cwStatus:        "Listening",
                        cwBtnText:       "Cancel",
                        flipCWClassName: "listen-class"
                    });
                    break;
                case "rotate-ccw-btn":
                    this.setState(
                    {
                        ccwStatus:        "Listening",
                        ccwBtnText:       "Cancel",
                        flipCCWClassName: "listen-class"
                    });
                    break;
                default:
                    this.setState(
                    {
                        pauseStatus:    "Listening",
                        pauseBtnText:   "Cancel",
                        pauseClassName: "listen-class"
                    });
                break;
            }

            this.configInput(configBtn, this.configCallback);
        }
        else
        {
            //Cancel all pending actions.
            this.setState(
            {
                leftStatus:       this.state.leftStatus === "Listening" ? "Ready" : this.state.leftStatus,
                leftBtnText:      "Change",
                leftClassName:    this.state.leftClassName === "listen-class" ? "ready-class" : this.state.leftClassName,
                rightStatus:      this.state.rightStatus === "Listening" ? "Ready" : this.state.rightStatus,
                rightBtnText:     "Change",
                rightClassName:   this.state.rightClassName === "listen-class" ? "ready-class" : this.state.rightClassName,
                downStatus:       this.state.downStatus === "Listening" ? "Ready" : this.state.downStatus,
                downBtnText:      "Change",
                downClassName:    this.state.downClassName === "listen-class" ? "ready-class" : this.state.downClassName,
                cwStatus:         this.state.cwStatus === "Listening" ? "Ready" : this.state.cwStatus,
                cwBtnText:        "Change",
                flipCWClassName:  this.state.flipCWClassName === "listen-class" ? "ready-class" : this.state.flipCWClassName,
                ccwStatus:        this.state.ccwStatus === "Listening" ? "Ready" : this.state.ccwStatus,
                ccwBtnText:       "Change",
                flipCCWClassName: this.state.flipCCWClassName === "listen-class" ? "ready-class" : this.state.flipCCWClassName,
                pauseStatus:      this.state.pauseStatus === "Listening" ? "Ready" : this.state.pauseStatus,
                pauseBtnText:     "Change",
                pauseClassName:   this.state.pauseClassName === "listen-class" ? "ready-class" : this.state.pauseClassName
            });

            this.cancelConfig();
        }
    }

    configCallback = (input, type, value, status) =>
    {
        //console.log("Input: " + input);
        //console.log("Type: " + type);
        //console.log("Value: " + value);
        //console.log("Status:" + status);

        let inputText;

        //Build the input text string.
        switch(type)
        {
            case UserSettings.IT_GAMEPAD_ANALOG:
                inputText = "STICK ";
                break;
            case UserSettings.IT_GAMEPAD_DIGITAL:
                inputText = "BTN ";
                break;
            case UserSettings.IT_GAMEPAD_DPAD:
                inputText = "PAD ";
                break;
            default:
                inputText = "KEY ";
                break;
        }

        //Complete the input text string.
        inputText += value;

        switch(input)
        {
            case UserSettings.IN_LEFT:
                if(status)
                {
                    this.setState(
                    {
                        leftStatus:    "Input already used",
                        leftClassName: "used-class",
                        leftBtnText:   "Change"
                    });
                }
                else
                {
                    this.setState(
                    {
                        leftStatus:    "Input changed",
                        leftClassName: "changed-class",
                        leftBtnText:   "Change",
                        leftText:      inputText
                    });
                }
                break;
            case UserSettings.IN_RIGHT:
                if(status)
                {
                    this.setState(
                    {
                        rightStatus:    "Input already used",
                        rightClassName: "used-class",
                        rightBtnText:   "Change"
                    });
                }
                else
                {
                    this.setState(
                    {
                        rightStatus:    "Input changed",
                        rightClassName: "changed-class",
                        rightBtnText:   "Change",
                        rightText:      inputText
                    });
                }
                break;
            case UserSettings.IN_DOWN:
                if(status)
                {
                    this.setState(
                    {
                        downStatus:    "Input already used",
                        downClassName: "used-class",
                        downBtnText:   "Change"
                    });
                }
                else
                {
                    this.setState(
                    {
                        downStatus:    "Input changed",
                        downClassName: "changed-class",
                        downBtnText:   "Change",
                        downText:      inputText
                    });
                }
                break;
            case UserSettings.IN_ROTATE_CW:
                if(status)
                {
                    this.setState(
                    {
                        cwStatus:        "Input already used",
                        flipCWClassName: "used-class",
                        cwBtnText:       "Change"
                    });
                }
                else
                {
                    this.setState(
                    {
                        cwStatus:        "Input changed",
                        flipCWClassName: "changed-class",
                        cwBtnText:       "Change",
                        flipCWText:      inputText
                    });
                }
                break;
            case UserSettings.IN_ROTATE_CCW:
                if(status)
                {
                    this.setState(
                    {
                        ccwStatus:        "Input already used",
                        flipCCWClassName: "used-class",
                        ccwBtnText:       "Change"
                    });
                }
                else
                {
                    this.setState(
                    {
                        ccwStatus:        "Input changed",
                        flipCCWClassName: "changed-class",
                        ccwBtnText:       "Change",
                        flipCCWText:      inputText
                    });
                }
                break;
            default:
                if(status)
                {
                    this.setState(
                    {
                        pauseStatus:    "Input already used",
                        pauseClassName: "used-class",
                        pauseBtnText:   "Change"
                    });
                }
                else
                {
                    this.setState(
                    {
                        pauseStatus:    "Input changed",
                        pauseClassName: "changed-class",
                        pauseBtnText:   "Change",
                        pauseText:      inputText
                    });
                }
                break;
        } 
    }

    init = () =>
    {
        window.addEventListener("gamepadconnected", this.connect);
        window.addEventListener("gamepaddisconnected", this.disconnect);
        document.addEventListener('keyup', this.doKeyUp);
        document.addEventListener('keydown', this.doKeyDown);
        window.addEventListener('focus', this.changeFocus);
        let updateTimer = setInterval(() => { this.update() }, 50);
        this.setState({updateTimer: updateTimer});
    }

    //Do this to prevent keys from locking up if user changes tabs.
    changeFocus = () =>
    {
        this.setState(
        {
            keysPressed: []
        });
    }

    connect = (evt) =>
    {
        this.setState(
        {
            controller: evt.gamepad,
            turbo: true
        });

        if(this.state.debug)console.log('Gamepad connected.');
    }

    disconnect = (evt) =>
    {
        this.setState(
        {
            turbo: false,
            controller: null,
            dPads: [],
            firstUpdate: true
        });

        if(this.state.debug)console.log('Gamepad disconnected.');
    }

    //Change one of the input values.
    setInput = (input, value, index, type) =>
    {
        switch(input)
        {
            case UserSettings.IN_LEFT:
                this.setState(
                {
                    leftBtn:   value,
                    leftIndex: index,
                    leftType:  type
                });
                break;
            case UserSettings.IN_RIGHT:
                this.setState(
                {
                    rightBtn:   value,
                    rightIndex: index,
                    rightType:  type
                });
                break;
            case UserSettings.IN_ROTATE_CW:
                this.setState(
                {
                    flipCWBtn:   value,
                    flipCWIndex: index,
                    flipCWType:  type
                });
                break;
            case UserSettings.IN_ROTATE_CCW:
                this.setState(
                {
                    flipCCWBtn:   value,
                    flipCCWIndex: index,
                    flipCCWType:  type
                });
                break;
            case UserSettings.IN_DOWN:
                this.setState(
                {
                    downBtn:   value,
                    downIndex: index,
                    downType:  type
                });
                break;
            default:
                this.setState(
                {
                    pauseBtn:   value,
                    pauseIndex: index,
                    pauseType:  type
                });
                break;
        }
    }

    //Need to make sure inputs are not already being used.
    checkInput = (input, value, index, type) =>
    {
        //Need to compensate for difference in keyboard input type.
        let leftBtn = this.state.leftBtn;
        let rightBtn = this.state.rightBtn;
        let downBtn = this.state.downBtn;
        let flipCWBtn = this.state.flipCWBtn;
        let flipCCWBtn = this.state.flipCCWBtn;
        let pauseBtn = this.state.pauseBtn;

        let isUsed = false;
        if(input !== UserSettings.IN_LEFT)
        {
            
            if(type === UserSettings.IT_KEYBOARD)
            {
                leftBtn = parseInt(leftBtn);
            }

            if(value === leftBtn && index === this.state.leftIndex && type === this.state.leftType)
            {
                isUsed = true;
            }
        }

        if(input !== UserSettings.IN_RIGHT)
        {
            if(type === UserSettings.IT_KEYBOARD)
            {
                rightBtn = parseInt(rightBtn);
            }

            if(value === rightBtn && index === this.state.rightIndex && type === this.state.rightType)
            {
                isUsed = true;
            }
        }

        if(input !== UserSettings.IN_DOWN)
        {
            if(type === UserSettings.IT_KEYBOARD)
            {
                downBtn = parseInt(downBtn);
            }

            if(value === downBtn && index === this.state.downIndex && type === this.state.downType)
            {
                isUsed = true;
            }
        }

        if(input !== UserSettings.IN_ROTATE_CW)
        {
            if(type === UserSettings.IT_KEYBOARD)
            {
                flipCWBtn = parseInt(flipCWBtn);
            }

            if(value === flipCWBtn && index === this.state.flipCWIndex && type === this.state.flipCWType)
            {
                isUsed = true;
            }
        }

        if(input !== UserSettings.IN_ROTATE_CCW)
        {
            if(type === UserSettings.IT_KEYBOARD)
            {
                flipCCWBtn = parseInt(flipCCWBtn);
            }

            if(value === flipCCWBtn && index === this.state.flipCCWIndex && type === this.state.flipCCWType)
            {
                isUsed = true;
            }
        }

        if(input !== UserSettings.IN_PAUSE)
        {
            if(type === UserSettings.IT_KEYBOARD)
            {
                pauseBtn = parseInt(pauseBtn);
            }

            if(value === pauseBtn && index === this.state.pauseIndex && type === this.state.pauseType)
            {
                isUsed = true;
            }
        }

        return isUsed;
    }

    //This function runs periodically when a player is changing an input mapping.
    configChecker = () =>
    {
        //We need to check the following arrays: buttonsStatus, axesStatus, keysPressed and dPads.
        
        //Check keyboard.
        let thisKey = Object.keys(this.state.keysPressed)
        if(thisKey.length)
        {
            let pushedKey = thisKey[0];
            let status = true;

            //Check that input is not already being used and then set the new input.
            if(!this.checkInput(this.state.configButton, parseInt(pushedKey), 0, UserSettings.IT_KEYBOARD))
            {
                this.setInput(this.state.configButton, pushedKey, 0, UserSettings.IT_KEYBOARD);
                status = false;
            }
            
            clearInterval(this.state.configTimer);
            return this.state.configCallback(this.state.configButton, UserSettings.IT_KEYBOARD, pushedKey, status);
        }

        //Check gamepad buttons.
        if(this.state.buttonsStatus.length)
        {
            let pushedButton = this.state.buttonsStatus[0];
            let status = true;

            //Check that input is not already being used and then set the new input.
            if(!this.checkInput(this.state.configButton, pushedButton, 0, UserSettings.IT_GAMEPAD_DIGITAL))
            {
                this.setInput(this.state.configButton, pushedButton, 0, UserSettings.IT_GAMEPAD_DIGITAL);
                status = false;
            }

            clearInterval(this.state.configTimer);
            return this.state.configCallback(this.state.configButton, UserSettings.IT_GAMEPAD_DIGITAL, pushedButton, status);
        }

        //Check analog sticks.
        if(this.state.axesStatus.length)
        {
            let status = true;

            for(let i = 0; i < this.state.axesStatus.length; i++)
            {
                if(parseFloat(this.state.axesStatus[i]) >= .50 && parseFloat(this.state.axesStatus[i]) <= 1.00 && !this.state.dPads[i])
                {
                    //Check that input is not already being used and then set the new input.
                    if(!this.checkInput(this.state.configButton, .50, i, UserSettings.IT_GAMEPAD_ANALOG))
                    {
                        this.setInput(this.state.configButton, .50, i, UserSettings.IT_GAMEPAD_ANALOG);
                        status = false;
                    }

                    clearInterval(this.state.configTimer);
                    return this.configCallback(this.state.configButton, UserSettings.IT_GAMEPAD_ANALOG, .50, status);
                }

                if(parseFloat(this.state.axesStatus[i]) <= -.50 && parseFloat(this.state.axesStatus[i]) >= -1.00 && !this.state.dPads[i])
                {
                    //Check that input is not already being used and then set the new input.
                    if(!this.checkInput(this.state.configButton, -.50, i, UserSettings.IT_GAMEPAD_ANALOG))
                    {
                        this.setInput(this.state.configButton, -.50, i, UserSettings.IT_GAMEPAD_ANALOG);
                        status = false;
                    }

                    clearInterval(this.state.configTimer);
                    return this.configCallback(this.state.configButton, UserSettings.IT_GAMEPAD_ANALOG, -.50, status);
                }                
            }
        }
        
        //Check D pad.
        if(this.state.axesStatus.length)
        {
            let status = true;

            for(let i = 0; i < this.state.axesStatus.length; i++)
            {
                if(parseFloat(this.state.axesStatus[i]) <= 1.00 && parseFloat(this.state.axesStatus[i]) >= -1.00 && this.state.dPads[i])
                {
                    //Check that input is not already being used and then set the new input.
                    if(!this.checkInput(this.state.configButton, parseFloat(this.state.axesStatus[i]), i, UserSettings.IT_GAMEPAD_DPAD))
                    {
                        this.setInput(this.state.configButton, parseFloat(this.state.axesStatus[i]), i, UserSettings.IT_GAMEPAD_DPAD);
                        status = false;
                    }

                    clearInterval(this.state.configTimer);
                    return this.configCallback(this.state.configButton, UserSettings.IT_GAMEPAD_DPAD, parseFloat(this.state.axesStatus[i]), status);
                }              
            }
        }
    }

    configInput = (button, configCallback) =>
    {
        clearInterval(this.state.configTimer);
        let configTimer = setInterval(() => this.configChecker(), 17);

        this.setState(
        {
            configButton:  button,
            configCallback: configCallback,
            enableOutput: false,
            configTimer: configTimer
        });
    }

    cancelConfig = () =>
    {
        clearInterval(this.state.configTimer);
    }

    onKeydown = (event) =>
    {
        let keysPressed = {...this.state.keysPressed};

        //Make sure values are not beign added in twice.  Will lock up the keys!
        if(!keysPressed[event.keyCode])
        {
            keysPressed[event.keyCode] = true;

            this.setState(
            {
                keysPressed: keysPressed
            });
        }
    }
    
    onKeyup = (event) =>
    {
        let keysPressed = {...this.state.keysPressed};
        delete keysPressed[event.keyCode];

        this.setState(
        {
            keysPressed: keysPressed
        });
    }

    doKeyUp = (event) =>
    {
        this.onKeyup(event);
    }

    doKeyDown = (event) =>
    {
        this.onKeydown(event);
    }

    update = () =>
    {
        //Clear the buttons cache
        this.setState(
        {
            buttonsCache: []
        });

        //Move the buttons status from the previous frame to the cache.
        this.setState(
        {
            buttonsCache: [...this.state.buttonsStatus]
        });

        //Clear the buttons status
        this.setState(
        {
            buttonsStatus: []
        });

        //Get the gamepad object
        let c =
        {
            buttons: [],
            axes: []
        }

        if(navigator.getGamepads()[0])
        {
            c = navigator.getGamepads()[0];
        }
        
        //Loop through buttons and push the pressed ones to the array
        let pressed = [];
        if(c.buttons)
        {
            for(let b = 0, t = c.buttons.length; b < t; b++)
            {
                if(c.buttons[b].pressed)
                {
                    pressed.push(b);
                }
            }
        }

        //Loop through axes and push their values to the array
        let axes = [];
        if(c.axes)
        {
            let dPads = [];

            for(let a = 0, x = c.axes.length; a < x; a++)
            {
                axes.push(c.axes[a].toFixed(2));

                //Create an array of D-pad axis indicators on the first update.
                if(this.state.firstUpdate)
                {
                    dPads.push(false);
                    this.setState(
                    {
                        dPads: dPads
                    });
                }
            }

            this.setState(
            {
                firstUpdate: false
            });
        }

        //Assign received values
        this.setState(
        {
            axesStatus: axes,
            buttonsStatus: pressed
        });

        let dPads2 = [...this.state.dPads];

        //Check for D-pad axis.
        for(let i = 0; i < this.state.axesStatus.length; i++)
        {
            if(this.state.axesStatus[i] > 1.0 || this.state.axesStatus[i] < -1.0)
            {
                dPads2[i] = true;
            }
        }

        this.setState(
        {
            dPads: dPads2
        });
    }

    dismissError = () =>
    {
        this.setState({ isError: false });
    }

    dismissInputError = () =>
    {
        this.setState({ isInputError: false });
    }

    inputText = (btn, type) =>
    {
        let typeText;

        switch(type)
        {
            case UserSettings.IT_KEYBOARD:
                typeText="KEY ";
                break;
            case UserSettings.IT_GAMEPAD_ANALOG:
                typeText="STICK ";
                break;
            case UserSettings.IT_GAMEPAD_DIGITAL:
                typeText="BTN ";
                break;
            default:
                typeText="DPAD ";
                break;
        }

        return typeText + btn;
    }

    passwordChange = (event) =>
    {
        this.setState({ password: event.target.value });
    }

    confirmChange = (event) =>
    {
        this.setState({ confirm: event.target.value });
    }

    changePassword = (event) =>
    {
        event.preventDefault();

        //Clear out any old messages.
        this.setState(
        { 
            errorTitle: "",
            errorMessage: "",
            errorType: "alert-danger",
            isError: false
        });

        //Make sure there are no blank fields.
        if (!this.state.password || !this.state.confirm)
        {
            this.setState(
            { 
                errorTitle: "Blank Fields!",
                errorMessage: "Please fill out all the fields.",
                errorType: "alert-danger",
                isError: true
            });
            return;
        }

        //Make sure the passwords match.
        if(this.state.password !== this.state.confirm)
        {
            this.setState(
            { 
                errorTitle: "Password Mismatch!",
                errorMessage: "Please verify your password.",
                errorType: "alert-danger",
                isError: true
            });
            return;
        }

        //Try to create the new user.
        API.password({username: this.state.username, password: this.state.password})
        .then(() =>
        { 
            this.setState(
            { 
                password: "",
                confirm: "",
                errorTitle: "Password Changed!",
                errorMessage: "Change was successful.",
                errorType: "alert-success",
                isError: true
            });
        })
        .catch(err => console.log(err)); 
    }

    //Save user input to the database.
    saveClick = () =>
    {
        this.setState(
        {
            isInputError: false
        });

        API.input(
        {
            username:     this.state.username,
            downBtn:      this.state.downBtn,
            downIndex:    this.state.downIndex,
            downType:     this.state.downType,
            leftBtn:      this.state.leftBtn,
            leftIndex:    this.state.leftIndex,
            leftType:     this.state.leftType,
            rightBtn:     this.state.rightBtn,
            rightIndex:   this.state.rightIndex,
            rightType:    this.state.rightType,
            flipCWBtn:    this.state.flipCWBtn,
            flipCWIndex:  this.state.flipCWIndex,
            flipCWType:   this.state.flipCWType,
            flipCCWBtn:   this.state.flipCCWBtn,
            flipCCWIndex: this.state.flipCCWIndex,
            flipCCWType:  this.state.flipCCWType,
            pauseBtn:     this.state.pauseBtn,
            pauseIndex:   this.state.pauseIndex,
            pauseType:    this.state.pauseType
        })
        .then((res) =>
        { 
            this.setState(
            {
                isInputError: true
            });
        })
        .catch(err => console.log(err)); 
    }

    render = () =>
    {
        return (
            <div className="container-fluid">
                <NavBar 
                    username={this.state.username}
                />
                <h1>User Settings</h1>
                <div className="row settings-body">
                    <div className="col-md-2"></div>

                    <div className="col-md-4 col-div">
                        <h4 className="user-headers text-center">Change Password</h4>

                        <div className="info-message">
                            <ErrorBox 
                                title={this.state.errorTitle}
                                type={this.state.errorType}
                                message={this.state.errorMessage}
                                showError={this.state.isError}
                                dismissError={this.dismissError}
                            />
                        </div>
                        
                        <form className="password">
                            <label htmlFor="password" className="form-label">New Password:</label><br />    
                            <input type="password" id="password-input" name="password"
                                value={this.state.password} onChange={this.passwordChange} className="form-control" /><br />
                            <label htmlFor="confirm" className="form-label">Confirm Password:</label><br />
                            <input type="password" id="password-confirm" name="confirm"
                                value={this.state.confirm} onChange={this.confirmChange} className="form-control" /><br />
                            <button type="submit" className="btn btn-outline-secondary" onClick={this.changePassword}>Change Password</button>
                        </form>
                    </div>

                    <div className="col-md-4 col-div">
                        <h4 className="user-headers text-center">Game Input</h4>

                        <div className="info-message">
                            <ErrorBox 
                                title={this.state.inputTitle}
                                type={this.state.inputType}
                                message={this.state.inputMessage}
                                showError={this.state.isInputError}
                                dismissError={this.dismissInputError}
                            />
                        </div>

                        <div>
                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-8">
                                    <span className="type-text">
                                        Down: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.downText}
                                    </span>
                                    <div className={this.state.downClassName}>
                                        {this.state.downStatus}
                                    </div>
                                </div>
                                <div className="col-md-4 text-right">
                                    <button className="btn btn-outline-info" id="down-btn" onClick={this.configClick}>{this.state.downBtnText}</button>
                                </div>
                            </div>

                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-8">
                                    <span className="type-text">
                                        Left: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.leftText}
                                    </span>
                                    <div className={this.state.leftClassName}>
                                        {this.state.leftStatus}
                                    </div>
                                </div>
                                <div className="col-md-4 text-right">
                                    <button className="btn btn-outline-info" id="left-btn" onClick={this.configClick}>{this.state.leftBtnText}</button>
                                </div>
                            </div>

                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-8">
                                    <span className="type-text">
                                        Right: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.rightText}
                                    </span>
                                    <div className={this.state.rightClassName}>
                                        {this.state.rightStatus}
                                    </div>
                                </div>
                                <div className="col-md-4 text-right">
                                    <button className="btn btn-outline-info" id="right-btn" onClick={this.configClick}>{this.state.rightBtnText}</button>
                                </div>
                            </div>

                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-8">
                                    <span className="type-text">
                                        Rotate CW: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.flipCWText}
                                    </span>
                                    <div className={this.state.flipCWClassName}>
                                        {this.state.cwStatus}
                                    </div>
                                </div>
                                <div className="col-md-4 text-right">
                                    <button className="btn btn-outline-info" id="rotate-cw-btn" onClick={this.configClick}>{this.state.cwBtnText}</button>
                                </div>
                            </div>

                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-8">
                                    <span className="type-text">
                                        Rotate CCW: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.flipCCWText}
                                    </span>
                                    <div className={this.state.flipCCWClassName}>
                                        {this.state.ccwStatus}
                                    </div>
                                </div>
                                <div className="col-md-4 text-right">
                                    <button className="btn btn-outline-info" id="rotate-ccw-btn" onClick={this.configClick}>{this.state.ccwBtnText}</button>
                                </div>
                            </div>

                            <div className="row ml-2 mt-2 mr-2 mb-3">
                                <div className="col-md-8">
                                    <span className="type-text">
                                        Pause: 
                                    </span>
                                    <span className="input-text">
                                        {this.state.pauseText}
                                    </span>
                                    <div className={this.state.pauseClassName}>
                                        {this.state.pauseStatus}
                                    </div>
                                </div>
                                <div className="col-md-4 text-right">
                                    <button className="btn btn-outline-info" id="pause-btn" onClick={this.configClick}>{this.state.pauseBtnText}</button>
                                </div>
                            </div>

                            <div className="text-right mr-4">
                                <button className="btn btn-outline-secondary" onClick={this.saveClick}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSettings;