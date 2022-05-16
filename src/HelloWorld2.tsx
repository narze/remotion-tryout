import {
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const Title: React.FC<{title: string}> = ({title}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return <div style={{opacity}}>{title}</div>;
};

export const HelloWorld2: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const scale = spring({
		fps,
		from: 0,
		to: 1,
		frame,
	});

	return (
		<div
			style={{
				flex: 1,
				textAlign: 'center',
				fontSize: '7em',
				opacity,
				transform: `scale(${scale})`,
			}}
		>
			<Sequence from={0} durationInFrames={40}>
				<Title title="Hello" />
			</Sequence>
			<Sequence from={40}>
				<Title title="Hello World" />
			</Sequence>
			<br />
			Opacity: {opacity}
			<br />
			Scale: {scale}
		</div>
	);
};
