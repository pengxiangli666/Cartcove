/*
 * Written by Jamel Chouarfia
 */

import javax.swing.JFrame;

public class RainbowFrame extends JFrame {
	private static final long serialVersionUID = 1L;
	
	RainbowFrame() {
		this.add(new RainbowCells());
		this.setTitle("Rainbow Cells");
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setResizable(false);
		this.pack();
		this.setVisible(true);
		this.setLocationRelativeTo(null);
	}
}
