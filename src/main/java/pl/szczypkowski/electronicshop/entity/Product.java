package pl.szczypkowski.electronicshop.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name ="unit_price")
    private BigDecimal unitPrice;
    @Column(name ="image_url")
    private String imageUrl;
    @Column(name ="active")
    private boolean active;
    @Column(name ="units_in_stock")
    private int unitsInStock;

    @ManyToOne
    @JoinColumn(name="category_id",nullable = false)
    private ProductCategory category;
}
