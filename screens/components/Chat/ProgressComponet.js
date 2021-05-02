import React, { useState } from 'react';
import TrackPlayer from 'react-native-track-player'
export class TrackStatus extends TrackPlayer.ProgressComponent {
    state = {
        duration: 0,
        isSeeking: false
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {
            duration: prevDuration,
            position: prevPosition,
            bufferedPosition: prevBufferedPosition
        } = this.state;
        const {
            duration: nextDuration,
            position: nextPosition,
            bufferedPosition: nextBufferedPosition
        } = nextState;
        if (prevDuration !== nextDuration || prevPosition !== nextPosition || prevBufferedPosition !== nextBufferedPosition) {
            return true;
        }
        return false;
    }
    render() {
        TrackPlayer.getDuration().then(duration => this.setState({ duration }))
        return (
            <View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center' }}>
                    <Text style={{ color: 'white', backgroundColor: 'transparent', width: 40, textAlign: 'center', fontSize: 12 }}>
                        {this.state.isSeeking ? this.formatTime(this.seek) : this.formatTime(this.state.position)}
                    </Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={this.state.duration}
                        thumbTintColor="white"
                        minimumTrackTintColor="#f06595"
                        maximumTrackTintColor="rgba(255,255,255,.8)"
                        step={1}
                        onValueChange={val => {
                            TrackPlayer.pause();
                            this.seek = val;
                            this.setState({ isSeeking: true })
                        }}
                        onSlidingComplete={val => {
                            this.setState({ isSeeking: false }, () => {
                                TrackPlayer.seekTo(this.seek);
                                this.position = this.seek;
                                TrackPlayer.play();
                            })
                        }}
                        value={this.state.isSeeking ? this.seek : this.state.position}
                    />
                    <Text>{this.formatTime(this.state.duration)}</Text>
                </View>
            </View>
        )
    }
}