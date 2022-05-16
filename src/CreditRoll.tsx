import faker from '@faker-js/faker';
import React, {
	MutableRefObject,
	RefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

faker.seed(123); // Fixed seed so that it works on multiple threads https://www.remotion.dev/docs/using-randomness

const memberList = Array(1000)
	.fill(0)
	.map((_, i) => {
		return faker.name.findName();
	});

const Members = React.memo(
	(props: {divRef: RefObject<HTMLDivElement>; translateY: number}) => {
		console.log('Members rerendered');

		return (
			<div
				ref={props.divRef}
				style={{
					color: 'white',
					position: 'absolute',
					transform: `translateY(${props.translateY}px)`,
				}}
			>
				<h1>ผู้สนับสนุน</h1>

				{memberList.map((member, idx) => {
					return (
						<div key={idx} style={{color: 'white'}}>
							{member}
						</div>
					);
				})}
			</div>
		);
	}
);

export const CreditRoll: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const [height, setHeight] = useState(0);
	// Const ref = useRef(null)

	useEffect(() => {
		if (ref?.current) {
			console.log({height: ref.current.scrollHeight});

			setHeight(ref.current.scrollHeight);
		}
	}, [ref]);

	const translateY = ~~interpolate(
		frame,
		[0, durationInFrames],
		[1080 * 1.2, -(height + 300)],
		{
			extrapolateRight: 'clamp',
		}
	);

	// Const scale = spring({
	// 	fps,
	// 	from: 0,
	// 	to: 1,
	// 	frame,
	// });

	return (
		<div style={{padding: '2rem', fontSize: '2rem'}}>
			<Members divRef={ref} translateY={translateY} />
		</div>
	);
};
