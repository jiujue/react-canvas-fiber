import { Canvas, View, Text } from '@jiujue/react-canvas-fiber'

export default function BackgroundDemo() {
	return (
		<div>
			<h2 style={{ marginBottom: 12 }}>Background Image Demo</h2>
			<Canvas
				width={800}
				height={600}
				style={{ border: '1px solid #ccc', borderRadius: 8 }}
			>
				<View style={{ width: 800, height: 600, padding: 20, gap: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
					
					{/* 1. Cover + Center */}
					<View
						style={{ width: 240, height: 240 }}
						border="2px solid #fff"
						borderRadius={12}
						background="#222"
						backgroundImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
						backgroundSize="cover"
						backgroundPosition="center"
					>
						<Text text="Cover + Center" style={{ fontSize: 16, fontWeight: 700, padding: 10 }} color="#fff" />
					</View>

					{/* 2. Contain + Repeat */}
					<View
						style={{ width: 240, height: 240 }}
						border="2px solid #fff"
						borderRadius={12}
						background="#333"
						backgroundImage="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
						backgroundSize="60px 60px"
						backgroundRepeat="repeat"
					>
						<Text text="Repeat 60px" style={{ fontSize: 16, fontWeight: 700, padding: 10 }} color="#fff" />
					</View>

					{/* 3. No Repeat + Bottom Right */}
					<View
						style={{ width: 240, height: 240 }}
						border="2px solid #fff"
						borderRadius={12}
						background="#000"
						backgroundImage="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
						backgroundSize="100px"
						backgroundRepeat="no-repeat"
						backgroundPosition="bottom right"
					>
						<Text text="No Repeat + BR" style={{ fontSize: 16, fontWeight: 700, padding: 10 }} color="#fff" />
					</View>
                    
                    {/* 4. Percentage Position */}
					<View
						style={{ width: 240, height: 240 }}
						border="2px solid #fff"
						borderRadius={12}
						background="#555"
						backgroundImage="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
						backgroundSize="50px"
						backgroundRepeat="no-repeat"
						backgroundPosition="20% 80%"
					>
						<Text text="Pos 20% 80%" style={{ fontSize: 16, fontWeight: 700, padding: 10 }} color="#fff" />
					</View>

				</View>
			</Canvas>
		</div>
	)
}
