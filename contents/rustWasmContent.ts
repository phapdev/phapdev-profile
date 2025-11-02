export const rustWasmContent = `
# Introduction to Rust and WebAssembly

Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety. WebAssembly (Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable target for compilation of high-level languages like C/C++/Rust, enabling deployment on the web for client and server applications.

## Why Rust for Wasm?

- **Performance**: Rust provides near C/C++ level performance, which is a huge win for computationally intensive tasks in the browser.
- **Safety**: Rust's ownership and borrowing rules prevent common memory errors, making your Wasm modules more secure and reliable.
- **Tooling**: The Rust and WebAssembly ecosystem has excellent tooling, like \`wasm-pack\`, which makes building, testing, and publishing Wasm packages a breeze.

## Setting up your environment

First, you'll need to install Rust. You can do this using \`rustup\`:
\`\`\`bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
\`\`\`

Next, install \`wasm-pack\`, the one-stop shop for building and working with Rust-generated WebAssembly that you would like to interop with JavaScript.
\`\`\`bash
cargo install wasm-pack
\`\`\`

## Your first Rust Wasm project

Let's create a new Rust library that we'll compile to Wasm.
\`\`\`bash
cargo new --lib wasm-game-of-life
cd wasm-game-of-life
\`\`\`
Now, add \`wasm-bindgen\` as a dependency in your \`Cargo.toml\`. This allows for interoperability between Rust and JavaScript.

- And that's the beginning!
- From here, you can build complex logic in Rust and call it seamlessly from your JavaScript frontend.
    `;
