/*
 * Written by Jamel Chouarfia
 */

import java.awt.Color;

public class Cell {
	private Color CellColor;
	private int ColorSpeed;
	private int Phase;
	
	Cell(Color CellColor, int ColorSpeed) {
		setColorSpeed(ColorSpeed);
		setColor(CellColor);
		setPhase();
	}
	
	public void updateColor() {
		int Temp = 0;
		int R = CellColor.getRed();
		int G = CellColor.getGreen();
		int B = CellColor.getBlue();
		
		switch(Phase) {
			case 1:
				R = R - ColorSpeed;
				G = G + ColorSpeed;
				
				if (0 > R) {
					Temp = R * -1;
					G = 255 - Temp;
					B = Temp;
					R = 0;
					updatePhase();
				}
				
				break;
			case 2:
				G = G - ColorSpeed;
				B = B + ColorSpeed;
				
				if (0 > G) {
					Temp = G * -1;
					B = 255 - Temp;
					R = Temp;
					G = 0;
					updatePhase();
				}
				
				break;
			case 3:
				B = B - ColorSpeed;
				R = R + ColorSpeed;
				
				if (0 > B) {
					Temp = B * -1;
					R = 255 - Temp;
					G = Temp;
					B = 0;
					updatePhase();
				}
				
				break;
		}
		
		setColor(new Color(R, G, B));
	}
	
	public void updatePhase() {
		switch(Phase) {
			case 1:
				Phase++;
				break;
			case 2:
				Phase++;
				break;
			case 3:
				Phase = 1;
				break;
		}
	}
	
	public void setPhase() {
		if (CellColor.getBlue() == 0) {
			if (CellColor.getGreen() == 0) {
				Phase = 1;
				return;
			} else if (CellColor.getRed() == 0) {
				Phase = 2;
				return;
			} else {
				Phase = 1;
				return;
			}
		} else if (CellColor.getRed() == 0) {
			if (CellColor.getGreen() == 0) {
				Phase = 3;
				return;
			} else {
				Phase = 2;
				return;
			}
		} else {
			Phase = 3;
			return;
		}
	}
	
	public void setColorSpeed(int ColorSpeed) {
		this.ColorSpeed = ColorSpeed;
	}
	
	public void setColor(Color CellColor) {
		this.CellColor = CellColor;
	}
	
	public Color getColor() {
		return CellColor;
	}
}
