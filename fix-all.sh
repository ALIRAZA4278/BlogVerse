#!/bin/bash

# Fix page.jsx - remove TypeScript Set syntax
sed -i 's/new Set<string>()/new Set()/g' app/page.jsx

# Fix blog page - remove "as string"
sed -i 's/ as string//g' "app/blogs/[id]/page.jsx"

# Fix login page - restore async function
sed -i 's/const handleSubmit = (e)/const handleSubmit = async (e)/g' app/auth/login/page.jsx

# Fix register page - restore async function
sed -i 's/const handleSubmit = (e)/const handleSubmit = async (e)/g' app/auth/register/page.jsx

echo "All files fixed"
