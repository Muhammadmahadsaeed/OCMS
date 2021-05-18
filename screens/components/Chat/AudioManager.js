import AudioRecorderPlayer from 'react-native-audio-recorder-player'

let audioRecorderPlayer = undefined
let currentPath = undefined
let currentCallback = () => { }
let currentPosition = 0

const AUDIO_STATUS = {
  play: 'play',
  begin: 'begin',
  pause: 'pause',
  resume: 'resume',
  stop: 'stop'
}

async function startPlayer(path, callback) {
  // console.log("current path=======",{ currentPath, path })

  if (currentPath === undefined) {
    currentPath = path
    currentCallback = callback
  } else if (currentPath !== path) {
    if (audioRecorderPlayer !== undefined) {
      try {
        await stopPlayer()
      } catch (error) {
        console.log('ERROR STOP PLAYER TOP')
      }
    }
    currentPath = path
    currentCallback = callback
  }

  if (audioRecorderPlayer === undefined) {
    audioRecorderPlayer = new AudioRecorderPlayer()
  }

  try {
    const activePath = await audioRecorderPlayer.startPlayer(currentPath);
    currentCallback({
      status: (currentPath === path) && (currentPosition > 0) ? AUDIO_STATUS.resume : AUDIO_STATUS.begin
    })
    audioRecorderPlayer.addPlayBackListener(async (e) => {
      if (e.current_position === e.duration) {
        try {
          await stopPlayer()
        } catch (error) {
          console.log('ERROR STOP PLAYER IN LISTENER')
        }
      } else {
        currentPosition = e.current_position
        currentCallback({
          status: AUDIO_STATUS.play,
          data: e
        })
      }
      return
    });
  } catch (error) {
    console.log({ 'ERROR PLAY PLAYER': error })
  }
}

async function pausePlayer() {
  try {
    await audioRecorderPlayer.pausePlayer();
    console.log("pause=======")
    currentCallback({ status: AUDIO_STATUS.pause })
  } catch (error) {
    console.log({ 'ERROR PAUSE PLAYER': error })
  }
}

async function stopPlayer() {
  const isStop = await audioRecorderPlayer.stopPlayer();
  console.log({ isStop })
  audioRecorderPlayer.removePlayBackListener()
  currentPosition = 0
  currentPath = undefined; // <----- added this line
  currentCallback({ status: AUDIO_STATUS.stop })
  audioRecorderPlayer = undefined
}

async function resumePlayer() {
  const isResume = await audioRecorderPlayer.resumePlayer();
  console.log({ isResume })
  // audioRecorderPlayer.removePlayBackListener()
  // currentPosition = 0
  // currentPath = undefined; // <----- added this line
  currentCallback({ status: AUDIO_STATUS.resume })
  // audioRecorderPlayer = undefined
}

export {
  AUDIO_STATUS,
  startPlayer,
  stopPlayer,
  pausePlayer,
  resumePlayer
}