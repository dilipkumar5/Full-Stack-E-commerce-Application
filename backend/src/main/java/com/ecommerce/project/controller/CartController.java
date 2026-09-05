package com.ecommerce.project.controller;

import com.ecommerce.project.model.Cart;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.repositories.CartRepository;
import com.ecommerce.project.service.CartService;
import com.ecommerce.project.util.AuthUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Cart APIs", description = "APIs for managing shopping carts")
@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    AuthUtil authUtil;

    @Autowired
    CartRepository cartRepository;

    @PostMapping("/carts/products/{productId}/quantity/{quantity}")
    @Operation(
            summary = "Add Product To Cart",
            description = "API to add a product with the specified quantity to the logged-in user's cart"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Product added to cart successfully"),
            @ApiResponse(
                    responseCode = "400",
                    description = "Product already exists in cart, is unavailable, or requested quantity exceeds available stock",
                    content = @Content
            ),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<CartDTO> addToCart(@PathVariable Long productId,
                                             @PathVariable Integer quantity){
        CartDTO cartDTO = cartService.addProductToCart(productId, quantity);
        return new ResponseEntity<>(cartDTO, HttpStatus.CREATED);
    }

    @GetMapping("/carts")
    @Operation(
            summary = "Get All Carts",
            description = "API to retrieve all shopping carts"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "302", description = "Carts retrieved successfully"),
            @ApiResponse(responseCode = "400", description = "No carts found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<CartDTO>> getCarts(){
        List<CartDTO> cartDTOS = cartService.getAllCarts();
        return new ResponseEntity<List<CartDTO>>(cartDTOS, HttpStatus.FOUND);
    }

    @GetMapping("/carts/users/cart")
    @Operation(
            summary = "Get Logged-In User's Cart",
            description = "API to retrieve the shopping cart of the currently logged-in user"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User cart retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Cart not found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<CartDTO> getCartById(){
        String emailId = authUtil.loggedInEmail();
        Cart cart = cartRepository.findCartByEmail(emailId);
        Long cartId = cart.getCartId();
        CartDTO cartDTO = cartService.getCart(emailId, cartId);
        return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);
    }

    @PutMapping("/cart/products/{productId}/quantity/{operation}")
    @Operation(
            summary = "Update Product Quantity In Cart",
            description = "API to increase or decrease the quantity of a product in the logged-in user's cart"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Product quantity updated successfully"),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid quantity update or product is not available in the cart",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Cart or product not found",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Internal Server Error",
                    content = @Content
            )
    })
    public ResponseEntity<CartDTO> updateCartProduct(@PathVariable Long productId,
                                                     @PathVariable String operation){
        CartDTO cartDto = cartService.updateProductQuantityInCart(productId,
                operation.equalsIgnoreCase("delete") ? -1 : 1);
        return new ResponseEntity<CartDTO>(cartDto, HttpStatus.OK);
    }

    @DeleteMapping("/carts/{cartId}/product/{productId}")
    @Operation(
            summary = "Delete Product From Cart",
            description = "API to remove a specific product from a cart"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Product removed from cart successfully"),
            @ApiResponse(responseCode = "404", description = "Cart or product not found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<String> deleteCartProduct(@PathVariable Long cartId,
                                                    @PathVariable Long productId){
        String status = cartService.deleteProductFromCart(cartId, productId);
        return new ResponseEntity<String>(status, HttpStatus.OK);
    }

}
