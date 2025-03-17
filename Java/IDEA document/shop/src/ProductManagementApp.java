import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class ProductManagementApp extends JFrame {
    private JTextField tfProductId, tfName, tfCategory, tfPurchasePrice, tfRetailPrice;
    private JTextArea taDisplay;
    private List<Product> productList;

    public ProductManagementApp() {
        productList = new ArrayList<>();
        loadProducts();

        setTitle("商品管理系统");
        setSize(600, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        JPanel inputPanel = new JPanel(new GridLayout(8, 4));
        inputPanel.add(new JLabel("商品ID:"));
        tfProductId = new JTextField();
        inputPanel.add(tfProductId);

        inputPanel.add(new JLabel("商品名:"));
        tfName = new JTextField();
        inputPanel.add(tfName);

        inputPanel.add(new JLabel("种类:"));
        tfCategory = new JTextField();
        inputPanel.add(tfCategory);

        inputPanel.add(new JLabel("购买价格:"));
        tfPurchasePrice = new JTextField();
        inputPanel.add(tfPurchasePrice);

        inputPanel.add(new JLabel("零售价:"));
        tfRetailPrice = new JTextField();
        inputPanel.add(tfRetailPrice);

        JButton btnAdd = new JButton("添加商品");
        btnAdd.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                addProduct();
            }
        });
        inputPanel.add(btnAdd);

        JButton btnUpdate = new JButton("更新商品");
        btnUpdate.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                updateProduct();
            }
        });
        inputPanel.add(btnUpdate);

        JButton btnDelete = new JButton("删除商品");
        btnDelete.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                deleteProduct();
            }
        });
        inputPanel.add(btnDelete);

        JButton btnSearch = new JButton("查询商品");
        btnSearch.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                searchProduct();
            }
        });
        inputPanel.add(btnSearch);

        add(inputPanel, BorderLayout.NORTH);

        // Center panel for displaying products
        taDisplay = new JTextArea();
        add(new JScrollPane(taDisplay), BorderLayout.CENTER);

        setVisible(true);
    }

    private void addProduct() {
        String productId = tfProductId.getText();
        String name = tfName.getText();
        String category = tfCategory.getText();
        double purchasePrice = Double.parseDouble(tfPurchasePrice.getText());
        double retailPrice = Double.parseDouble(tfRetailPrice.getText());

        Product product = new Product(productId, name, category, purchasePrice, retailPrice);
        productList.add(product);
        saveProducts();
        displayProducts();
    }

    private void updateProduct() {
        String productId = tfProductId.getText();
        for (Product product : productList) {
            if (product.getProductId().equals(productId)) {
                product.setName(tfName.getText());
                product.setCategory(tfCategory.getText());
                product.setPurchasePrice(Double.parseDouble(tfPurchasePrice.getText()));
                product.setRetailPrice(Double.parseDouble(tfRetailPrice.getText()));
                saveProducts();
                displayProducts();
                return;
            }
        }
        JOptionPane.showMessageDialog(this, "商品未找到");
    }

    private void deleteProduct() {
        String productId = tfProductId.getText();
        productList.removeIf(product -> product.getProductId().equals(productId));
        saveProducts();
        displayProducts();
    }

    private void searchProduct() {
        String productId = tfProductId.getText();
        for (Product product : productList) {
            if (product.getProductId().equals(productId)) {
                tfName.setText(product.getName());
                tfCategory.setText(product.getCategory());
                tfPurchasePrice.setText(String.valueOf(product.getPurchasePrice()));
                tfRetailPrice.setText(String.valueOf(product.getRetailPrice()));
                return;
            }
        }
        JOptionPane.showMessageDialog(this, "商品未找到");
    }

    private void displayProducts() {
        taDisplay.setText("");
        for (Product product : productList) {
            taDisplay.append(product + "\n");
        }
    }

    private void saveProducts() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("products.dat"))) {
            oos.writeObject(productList);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void loadProducts() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("products.dat"))) {
            productList = (List<Product>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        new ProductManagementApp();
    }
}
