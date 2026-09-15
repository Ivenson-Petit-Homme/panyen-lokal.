-- Panyen Lokal S.A. - MySQL Database Schema
-- Version: 2.1 (MySQL / MariaDB)
-- Created: 2026-09-14

-- 1. Create database if it does not exist
CREATE DATABASE IF NOT EXISTS panyen_lokal_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE panyen_lokal_db;

-- 2. Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(30),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    preferred_region ENUM('haiti', 'usa', 'dominican_republic') DEFAULT 'haiti',
    company_name VARCHAR(100),
    street VARCHAR(255),
    city VARCHAR(100),
    state_or_department VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Products table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(191) UNIQUE NOT NULL,
    slogan TEXT,
    category ENUM('Huiles & Soins Naturels', 'Boissons & Liqueurs', 'Épicerie & Alimentaire') NOT NULL,
    short_description TEXT,
    description TEXT,
    image_url VARCHAR(255),
    is_featured TINYINT(1) DEFAULT 0,
    in_stock TINYINT(1) DEFAULT 1,
    origin VARCHAR(100),
    terroir_location TEXT,
    badge VARCHAR(50),
    highlights JSON,
    ingredients JSON,
    usage_instructions JSON,
    technical_specs JSON,
    certifications JSON,
    gallery JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Product Formats table
CREATE TABLE IF NOT EXISTS product_formats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    format_name VARCHAR(100) NOT NULL,
    price_usd DECIMAL(10, 2) NOT NULL,
    price_htg DECIMAL(12, 2),
    unit VARCHAR(50),
    type ENUM('retail', 'export') DEFAULT 'retail',
    moq INT DEFAULT 1,
    weight_kg DECIMAL(8, 2),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Orders table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    order_number VARCHAR(30) UNIQUE NOT NULL,
    user_id VARCHAR(50),
    region ENUM('haiti', 'usa', 'dominican_republic') NOT NULL,
    subtotal_usd DECIMAL(10, 2) NOT NULL,
    shipping_fee_usd DECIMAL(10, 2) DEFAULT 0.00,
    total_usd DECIMAL(10, 2) NOT NULL,
    total_local DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    payment_method VARCHAR(100),
    payment_status ENUM('en_attente', 'paye', 'a_la_livraison') DEFAULT 'en_attente',
    status ENUM('en_attente', 'en_preparation', 'en_transit_export', 'expedie', 'livre', 'annule') DEFAULT 'en_attente',
    estimated_delivery VARCHAR(100),
    tracking_number VARCHAR(100),
    delivery_street TEXT,
    delivery_city VARCHAR(100),
    delivery_country VARCHAR(100),
    delivery_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 6. Order Items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_id VARCHAR(50),
    product_title VARCHAR(255),
    selected_format VARCHAR(100),
    quantity INT NOT NULL,
    unit_price_usd DECIMAL(10, 2),
    total_price_usd DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. B2B Quotes table
CREATE TABLE IF NOT EXISTS b2b_quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference_number VARCHAR(30) UNIQUE NOT NULL,
    company_name VARCHAR(100),
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(30),
    destination_country VARCHAR(100),
    industry VARCHAR(100),
    incoterm VARCHAR(50),
    requirements TEXT,
    status ENUM('nouveau', 'en_etude', 'devis_envoye', 'termine') DEFAULT 'nouveau',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- 8. INSERT ADMIN USER (password: admin123)
-- Hash bcrypt for 'admin123' generated automatically at server start
-- ============================================
INSERT IGNORE INTO users (id, full_name, email, password_hash, role, preferred_region)
VALUES (
    'admin-01',
    'Admin Panyen Lokal',
    'admin@panyenlokal.com',
    '$2a$10$placeholderplaceholderplaceholderph',
    'admin',
    'haiti'
);
