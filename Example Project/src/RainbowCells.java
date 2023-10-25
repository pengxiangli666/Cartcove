/*
 * Written by Jamel Chouarfia
 */

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JPanel;
import javax.swing.Timer;

public class RainbowCells extends JPanel implements ActionListener {
	private static final long serialVersionUID = 1L;
	private static final int SIZE = 500;
	private static final int CELLSPERLAYER = 9;
	private static final int BORDERSIZE = (int) (0.14 * (SIZE/CELLSPERLAYER));
	private static final int CELLCOUNT = CELLSPERLAYER * CELLSPERLAYER;
	private static final int CORRECTION = (int) (SIZE-(int)((double)SIZE/CELLSPERLAYER)*CELLSPERLAYER);
	private static final int COLORSPREAD = 3;
	private static final int COLORSPEED = 5;
	private static final int DELAY = 10;
	private static Cell[] Cells = new Cell[CELLCOUNT];
	Timer timer;
	
	RainbowCells() {
		this.setPreferredSize(new Dimension(SIZE+BORDERSIZE-CORRECTION, SIZE+BORDERSIZE-CORRECTION));
		this.setBackground(Color.BLACK);
		this.setFocusable(true);
		startRainbow();
	}
	
	public void startRainbow() {
		int Timer = 0;
		int Temp = 0;
		int R = 255;
		int G = 0;
		int B = 0;
		
		while (CELLCOUNT > Timer) {
			Cells[Timer] = new Cell(new Color(R,G,B), COLORSPEED);
			if (B == 0) {
				R = R - COLORSPREAD;
				G = G + COLORSPREAD;
				
				if (0 > R) {
					Temp = R * -1;
					G = 255 - Temp;
					B = Temp;
					R = 0;
				}
			} else if (G == 0) {
				B = B - COLORSPREAD;
				R = R + COLORSPREAD;
				
				if (0 > B) {
					Temp = B * -1;
					R = 255 - Temp;
					G = Temp;
					B = 0;
				}
			} else if (R == 0) {
				G = G - COLORSPREAD;
				B = B + COLORSPREAD;
				
				if (0 > G) {
					Temp = G * -1;
					B = 255 - Temp;
					R = Temp;
					G = 0;
				}
			}
			Timer++;
		}
		
		timer = new Timer(DELAY, this);
		timer.start();
	}
	
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		draw(g);
	}
	
	public void draw(Graphics g) {
		int Timer = 0;
		int X = 0;
		int Y = 0;
		
		while (CELLCOUNT > Timer) {
			g.setColor(Cells[Timer].getColor());
			g.fillRect(X, Y, SIZE/CELLSPERLAYER, SIZE/CELLSPERLAYER);
			Timer++;
			
			X = X + SIZE/CELLSPERLAYER;
			
			if (X >= SIZE - CORRECTION) {
				X = 0;
				Y = Y + SIZE/CELLSPERLAYER;
			}
		}
		
		g.setColor(Color.black);
		Timer = 0;
		X = 0;
		Y = 0;
		
		while (CELLSPERLAYER > Timer) {
			g.fillRect(X, Y, BORDERSIZE, SIZE);
			Timer++;
			
			X = X + SIZE/CELLSPERLAYER;
		}
		
		Timer = 0;
		X = 0;
		
		while (CELLSPERLAYER > Timer) {
			g.fillRect(X, Y, SIZE, BORDERSIZE);
			Timer++;
			
			Y = Y + SIZE/CELLSPERLAYER;
		}
	}
	
	public void update() {
		int Timer = 0;
		
		while (CELLCOUNT > Timer) {
			Cells[Timer].updateColor();
			Timer++;
		}
	}
	
	public void actionPerformed(ActionEvent e) {
		update();
		repaint();
	}
	
}
